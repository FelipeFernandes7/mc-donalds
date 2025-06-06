"use client";

import Image from "next/image";

import { ChefHat, ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/helpers/format-currency";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useCart } from "../../contexts/cart";
import { CartSheet } from "../../components/cart-sheet";

interface ProductDetailProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { avatarImageUrl: true; name: true };
      };
    };
  }>;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const { toggleCart, addProduct } = useCart();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => {
      if (prev === 1) return prev;
      return prev - 1;
    });
  };

  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity,
    });
    toggleCart();
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl p-5 flex-auto flex flex-col overflow-hidden">
        <div className="flex-auto overflow-hidden">
          <div className="flex items-center gap-1.5">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="gap-1 text-xs text-muted-foreground">
              {product.restaurant.name}
            </p>
          </div>

          <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

          <div className="flex items-center justify-between mt-3">
            <h3 className="text-xl font-semibold">
              {formatCurrency(product.price)}
            </h3>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleDecrement}
                variant={"outline"}
                className="h-8 w-8 rounded-xl"
              >
                <ChevronLeft />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button
                onClick={handleIncrement}
                variant={"destructive"}
                className="h-8 w-8 rounded-xl"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-full">
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold">Sobre</h4>
              <p className="text-muted-foreground text-sm">
                {product.description}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1.5">
                <ChefHat size={18} />
                <h4 className="font-semibold">Ingredientes</h4>
              </div>
              <ul className="list-disc px-5 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>

        <Button onClick={handleAddToCart} className="rounded-full w-full">
          Adicionar à sacola
        </Button>
      </div>

      <CartSheet />
    </>
  );
}
