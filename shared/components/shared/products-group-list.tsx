"use client";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { useIntersection } from "react-use";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/shared/store/categiry";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  items,
  categoryId,
  className,
  listClassName,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActivateId);
  const IntersectionRef = React.useRef(null);
  const Intersection = useIntersection(IntersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (Intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, Intersection?.isIntersecting, title, setActiveCategoryId]);

  return (
    <div className={className} id={title} ref={IntersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className="grid grid-cols-3 gap-[50px]">
        {items.map((product, i) => (
          <ProductCard
            id={product.id}
            key={product.id}
            name={product.name}
            price={product.items[0].price}
            imageUrl={product.imageUrl}
						ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
