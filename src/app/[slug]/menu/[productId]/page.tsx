import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductHeader } from "./components/product-header";
import { ProductDetail } from "./components/product-detail";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productId } = await params;

  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: { avatarImageUrl: true, name: true, slug: true },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  if (product.restaurant.slug.toLowerCase() !== slug.toLowerCase()) {
    return notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <ProductHeader product={product} />
      <ProductDetail product={product} />
    </div>
  );
}
