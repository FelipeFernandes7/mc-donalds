import Image from "next/image";

import { Button } from "@/components/ui/button";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { ChevronLeft, ScrollText } from "lucide-react";
import { notFound } from "next/navigation";
import { RestaurantHeader } from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (method: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(method.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await getRestaurantBySlug(slug);

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }
  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
