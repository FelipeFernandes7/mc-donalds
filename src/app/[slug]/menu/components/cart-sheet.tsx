import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "../contexts/cart";
import { CartProductItem } from "./cart-product-item";

export function CartSheet() {
  const { isOpen, toggleCart, products } = useCart();
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>

        <div className="py-5">
          {products.map((product) => (
            <CartProductItem key={product.id} product={product} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
