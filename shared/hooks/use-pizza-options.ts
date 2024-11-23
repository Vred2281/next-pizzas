import React from "react";
import { Variant } from "../components/shared/choose-variants";
import { PizzaType, PizzaSize } from "../constans/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSies: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (size: PizzaType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const availableSies = getAvailablePizzaSizes(type, items);

  const currentItemId = items.find((item) => item.pizzaTipe === type && item.size === size)?.id;

  React.useEffect(() => {
    const isAvailableSize = availableSies?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
    const availableSize = availableSies?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availableSies,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};