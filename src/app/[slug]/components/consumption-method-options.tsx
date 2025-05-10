import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ConsumptionMethod } from "@prisma/client";

interface ConsumptionMethodOptionsProps {
  imageUrl: string;
  altText: string;
  buttonText: string;
  option: ConsumptionMethod;
  slug: string;
}

export function ConsumptionMethodOptions({
  imageUrl,
  buttonText,
  altText,
  option,
  slug,
}: ConsumptionMethodOptionsProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image src={imageUrl} alt={altText} fill className="object-contain" />
        </div>
        <Button asChild variant={"secondary"} className="rounded-full">
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
