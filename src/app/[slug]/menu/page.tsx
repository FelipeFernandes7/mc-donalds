import { notFound } from "next/navigation";
import { RestaurantHeader } from "./components/header";
import { RestaurantCategories } from "./components/categories";
import { db } from "@/lib/prisma";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

function isConsumptionMethodValid(method: string) {
  return ["DINE_IN", "TAKEAWAY"].includes(method.toUpperCase());
}

export default async function RestaurantMenuPage({
  params,
  searchParams,
}: RestaurantMenuPageProps) {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  });

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }
  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
}
