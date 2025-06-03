"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({} as ICartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id
    );
    if (productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }

    setProducts((prevProducts) => {
      return prevProducts.map((prev) => {
        if (prev.id === product.id) {
          return {
            ...prev,
            quantity: prev.quantity + product.quantity,
          };
        }
        return prev;
      });
    });
  };

  return (
    <CartContext.Provider value={{ isOpen, products, toggleCart, addProduct }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
