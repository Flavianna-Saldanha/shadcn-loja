import { Cart } from "@/src/types/cart";

type Props = {
	cartItem: Cart;
}

export const CartItemQuantity = ({ cartItem }: Props) => {
	return (
		<div>
			{cartItem.quantity}
		</div>
	);
}