import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "../contexts/cart";
import { CartProductItem } from "./cart-product-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";

export function CartSheet() {
  const { isOpen, toggleCart, products, total } = useCart();
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>
          <Card className="mb-6 rounded-2xl">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total:</p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>
          <Button className="w-full rounded-full">Finalizar pedido</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
