import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constans/pizza";

/**
 * Фунция для подсчёта общей стоимости пиццы
 * 
 * @example ```calcTotalPizzaPrice(1, 20, items, ingredients, selectedIngredients)```
 * 
 * @param type - тип теста пиццы
 * @param size - размер пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - список выбранных ингредиентов
 * @returns - numder общая стоимость пиццы
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<Number>,
) => {
  const pizzaPrice =
    items.find((item) => item.size === size && item.pizzaTipe === type)
      ?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
