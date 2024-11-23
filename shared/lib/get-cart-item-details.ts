import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constans/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  Ingredients: CartStateItem["ingredients"],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (Ingredients) {
    details.push(...Ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
