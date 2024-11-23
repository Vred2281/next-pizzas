import {
  Container,
  ProductForm,
} from "@/shared/components/shared/";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const productId = Number(id);
  if (isNaN(productId)) {
    return notFound();
  }

  const product = await prisma.product.findFirst({
    where: { id: productId },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: {},
    },
  });

  if (!product) {
    return notFound();
  }
  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} />
    </Container>
  );
}
