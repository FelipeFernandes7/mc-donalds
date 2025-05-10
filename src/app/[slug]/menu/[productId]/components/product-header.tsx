"use client";

import Image from "next/image";

import { ChevronLeft, ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}
export function ProductHeader({ product }: ProductHeaderProps) {
  const router = useRouter();
  const handleBack = () => router.back();
  return (
    <div className="relative w-full h-[300px]">
      <Button
        onClick={handleBack}
        className="absolute top-4 left-4 rounded-full z-50"
        variant={"secondary"}
        size={"icon"}
      >
        <ChevronLeft />
      </Button>

      <Button
        className="absolute top-4 right-4 rounded-full z-50"
        variant={"secondary"}
        size={"icon"}
      >
        <ScrollText />
      </Button>
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-contain"
      />
    </div>
  );
}
