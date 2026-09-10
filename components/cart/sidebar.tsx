"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { RocketIcon } from "lucide-react"
import { Separator } from "../ui/separator"
import { useCartStore } from "@/src/stores/cart-store"
import { CartItem } from "./item"
import { useState } from "react"
import { CheckoutDialog } from "../checkout/dialog"

export const CartSidebar = () => {
	const { cart } = useCartStore(state => state);
	const [checkoutOpen, setCheckoutOpen] = useState(false);

	let subtotal = 0;
	for(const item of cart) {
		subtotal += item.product.price * item.quantity;
	}

	return (
		<Sheet>
			<SheetTrigger
				render={
					<Button className="relative">
						<RocketIcon className="mr-2" />
						<p>Carrinho</p>
						{cart.length > 0 &&
							<div className="absolute size-2.5 bg-red-600 rounded-full -right-0.5 -top-1"></div>
						}
					</Button>
				}
			/>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>Carrinho</SheetTitle>
				</SheetHeader>

				<div className="flex flex-col gap-5 my-3 mx-4">
					{cart.map(item => (
						<CartItem key={item.product.id} item={item} />
					))}
				</div>

				<Separator className="my-4" />

				<div className="flex justify-between items-center text-xs ml-4">
					<div>Subtotal:</div>
					<div>R$ {subtotal.toFixed(2)}</div>
				</div>

				<Separator className="my-4" />

				<div className="text-center">
					<Button
						onClick={() => setCheckoutOpen(true)}
						disabled={cart.length === 0}
					>Finalizar Compra
					</Button>
				</div>

				<CheckoutDialog 
					open={checkoutOpen}
					onOpenChange={setCheckoutOpen}
				/>
			</SheetContent>
		</Sheet>
	)
}