import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import React from "react";
import { SortPopup } from "./sort-popup";
import { Categories } from "./cotegories";
import { Container } from "./container";
import { Category } from "@prisma/client";

interface Props {
	categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shodow-bg swodow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories items={categories}/>
        <SortPopup />
      </Container>
    </div>
  );
};
