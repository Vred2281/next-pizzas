import { cn } from "@/shared/lib/utils";
import React from "react";
import { ArrowUpDown } from "lucide-react";

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-gray-50 p-1 h-[52px] rounded-2xl cursor-pointer",
        className
      )}
    >
      <ArrowUpDown size={16} />
      <b>Сортировка</b>
      <b className="text-primary">популярное</b>
    </div>
  );
};
