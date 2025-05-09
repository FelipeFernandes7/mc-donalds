import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeft, ScrollText } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductHeader } from "./components/product-header";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productId } = await params;
  const product = await db.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <ProductHeader product={product} />
    </>
  );
}
