"use client"

import { Product } from "@/src/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useCartStore } from "@/src/stores/cart-store";

type Props = {
	item: Product;
	priority?: boolean;
}

export const ProductItem = ({ item, priority = false }: Props) => {
	const { upsertCartItem } = useCartStore(state => state);

	const handleAddButton = () => {
		upsertCartItem(item, 1);
		toast.add({
			title: "Item adicionado ao carrinho",
			description: `${item.name} foi adicionado ao seu carrinho.`,
		});
	}

	return (
		<div>
			<div className="rounded-md overflow-hidden">
				<Image 
					src={item.image}
					alt={item.name}
					width={400}
					height={300}
					sizes="(max-width: 768px) 50vw, 25vw"
					priority={priority}
					className="w-full h-32 object-cover"
				/>
			</div>

			<div className="mt-3 flex flex-col gap-2">
				<p className="text-lg">{item.name}</p>

				<p className="text-sm opacity-50">
					R$ {item.price.toFixed(2)}
				</p>

				<Button
					variant="outline"
					onClick={handleAddButton}
				>
					Adicionar
				</Button>
			</div>
		</div>
	);
}