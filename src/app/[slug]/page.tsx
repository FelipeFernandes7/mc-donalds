import Image from "next/image";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConsumptionMethodOptions } from "./components/consumption-method-options";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          height={82}
          width={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      <div className="pt-24 text-center space-y-2">
        <h3 className="text-3xl font-semibold">Seja bem vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>
      <div className="pt-14 grid grid-cols-2 gap-4">
        <ConsumptionMethodOptions
          imageUrl="/dine_in.png"
          altText="Comer aqui"
          buttonText="Para comer aqui"
          option="DINE_IN"
          slug={slug}
        />
        <ConsumptionMethodOptions
          imageUrl="/takeaway.png"
          altText="Para levar"
          buttonText="Para levar"
          option="TAKEAWAY"
          slug={slug}
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
