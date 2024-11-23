import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useSet } from "react-use";
import { QueryFilters } from "./use-filters";

export const useIngredients = () => {
	const searchParams = useSearchParams() as unknown as Map<
	keyof QueryFilters,
	string
>
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);
	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(searchParams.get("sizes")?.split(",")));

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.Ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

	return {
    ingredients,
    loading,
  };
};
