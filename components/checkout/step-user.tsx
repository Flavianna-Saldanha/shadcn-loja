import { CheckoutStep } from "@/src/types/checkout-steps";
import { Controller, useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCheckoutStore } from "@/src/stores/checkout-store";

import { Input } from "@/components/ui/input";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Button } from "../ui/button";

const formSchema = z.object({
	name: z.string().min(2, "Preencha seu nome"),
});

type Props = {
	setStep: Dispatch<SetStateAction<CheckoutStep>>;
};

export const StepUser = ({ setStep }: Props) => {
	const { name, setName } = useCheckoutStore((state) => state);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name,
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		setName(values.name);
		setStep("address");
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex flex-col gap-4"
		>
			<Controller
				control={form.control}
				name="name"
				render={({ field, fieldState }) => (
					<FieldGroup>
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="name">
								Seu nome
							</FieldLabel>

							<Input
								{...field}
								id="name"
								placeholder="Digite seu nome"
								aria-invalid={fieldState.invalid}
							/>

							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>

						<Button type="submit" variant="outline">Próximo</Button>
					</FieldGroup>
				)}
			/>
		</form>
	);
};