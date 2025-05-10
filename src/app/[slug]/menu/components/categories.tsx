import { Restaurant } from "@prisma/client";
import { Clock } from "lucide-react";
import Image from "next/image";

interface RestaurantCategoriesProps {
  restaurant: Restaurant;
}

export function RestaurantCategories({
  restaurant,
}: RestaurantCategoriesProps) {
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-white p-5">
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
  );
}
