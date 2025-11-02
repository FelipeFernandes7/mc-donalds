"use client";

import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { Products } from "./products";
import { useCart } from "../contexts/cart";
import { formatCurrency } from "@/helpers/format-currency";
import { CartSheet } from "./cart-sheet";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

export function RestaurantCategories({
  restaurant,
}: RestaurantCategoriesProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  const { products, total, totalQuantity, toggleCart } = useCart();

  return (
    <div className="w-full relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
      <div className="p-5">
        <div className="flex items-center gap-3 ">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            height={45}
            width={45}
          />
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-green-500 mt-3">
          <Clock size={12} />
          <p>Aberto</p>
        </div>
      </div>
      <ScrollArea className="w-full ">
        <div className="flex w-max space-x-4 px-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="rounded-full"
              variant={getCategoryButtonVariant(category)}
              size={"sm"}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="px-5 font-semibold pt-2">{selectedCategory.name}</h3>
      <Products products={selectedCategory.products} />

      {products.length > 0 && (
        <div className="w-full fixed bottom-0 left-0 right-0 flex items-center justify-between border-t bg-white px-5 py-3">
          <div>
            <p className="text-xs text-muted-foreground">Total dos pedidos</p>
            <p className="text-sm font-semibold">
              {formatCurrency(total)}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </p>
          </div>

          <Button onClick={toggleCart}>Ver sacola</Button>
          <CartSheet />
        </div>
      )}
    </div>
  );
}
