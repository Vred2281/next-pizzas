/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  className?: string;
  size: 20 | 30 | 40;
  imageUrl: string;
}

export const ProductImage: React.FC<Props> = ({ className, imageUrl, size }) => {
  return (
    <div
      className={cn("flex items-center justify-center flex-1 relative w-full")}
    >
      <img
        src={imageUrl}
        alt="product"
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300"
        )}
      />
	</div>
  );
};
