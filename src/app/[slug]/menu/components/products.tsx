"use client";

import Image from "next/image";
import Link from "next/link";

import { Product } from "@prisma/client";
import { useParams } from "next/navigation";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductsProps {
  products: Product[];
}

export function Products({ products }: ProductsProps) {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="space-y-3 px-5">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}`}
          className="flex items-center justify-between gap-10 py-3 border-b"
        >
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>

          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
