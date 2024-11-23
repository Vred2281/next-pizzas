"use server";

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components";
import { VerificationUserTemplate } from "@/shared/components/shared/email-templtes/verification-user";
import { CheckoutFormValues } from "@/shared/constans";
import { createPayment, sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;
    if (!cartToken) {
      throw new Error("cartToken не найден");
    }
    // Находим карзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });
    // Если корзина не найдена = ошибка
    if (!userCart) {
      throw new Error("Корзина не найдена");
    }
    // Если корзина пуста = ошибка
    if (userCart?.totalAmount === 0) {
      throw new Error("Корзина пуста");
    }
    // Создаём заказ
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.lastName + " " + data.firstName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });
    // Обнуляем корзину
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });
    // TODO: Ссылка на оформление заказа

    const paymentData = await createPayment({
      orderId: order.id,
      amount: order.totalAmount,
      description: "Оплата заказа № " + order.id,
    });

    if (!paymentData) {
      throw new Error("Не удалось создать платеж");
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });
    const paymentUrl = paymentData.confirmation.confirmation_url;
    await sendEmail(
      data.email,
      "Next Pizza - Оплата заказа №" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    );

    return paymentUrl;
  } catch (err) {
    console.log("[CreateOrder] Server error", err);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const correntUser = await getUserSession();

    if (!correntUser) {
      throw new Error("Пользователь не найден");
    }
    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(correntUser.id),
      },
    });
    return await prisma.user.update({
      where: {
        id: Number(correntUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (err) {
    console.log("[UpdateUserInfo] Server error", err);
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Почта не подтверждена");
      }
      throw new Error("Пользователь уже зарегистрирован");
    }
    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      "Next Pizza - Подтверждение регистрации",
      VerificationUserTemplate({ code })
    );
  } catch (err) {
    console.log("[RegisterUser] Server error", err);
  }
}
