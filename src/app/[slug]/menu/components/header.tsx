"use client";
import Image from "next/image";

import { ChevronLeft, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { useRouter } from "next/navigation";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <div className="w-full relative h-[250px]">
      <Button
        onClick={handleBack}
        className="absolute top-4 left-4 rounded-full z-50"
        variant={"secondary"}
        size={"icon"}
      >
        <ChevronLeft />
      </Button>
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        className="object-cover"
        fill
      />
      <Button
        className="absolute top-4 right-4 rounded-full z-50"
        variant={"secondary"}
        size={"icon"}
      >
        <ScrollText />
      </Button>
    </div>
  );
}
