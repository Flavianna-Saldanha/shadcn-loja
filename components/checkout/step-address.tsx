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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
	street: z.string().min(2, "Preencha o endereço"),
	number: z.string().min(2, "Preencha o número"),
	complement: z.string().optional(),
	district: z.string().min(2, "Preencha o bairro"),
	city: z.string().min(2, "Preencha a cidade"),
	state: z.string().min(2, "Preencha o estado"),
});

type Props = {
	setStep: Dispatch<SetStateAction<CheckoutStep>>;
};

export const StepAddress = ({ setStep }: Props) => {
	const { address, setAddress } = useCheckoutStore((state) => state);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...address,
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		setAddress(values);
		setStep("finish");
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
		>
			<div className="grid grid-cols-2 gap-4">
				<Controller
					control={form.control}
					name="street"
					render={({ field, fieldState }) => (
							<FieldGroup>
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="name">
										Rua
									</FieldLabel>

									<Input
										{...field}
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>	
							</FieldGroup>
					)}
				/>

				<Controller
					control={form.control}
					name="number"
					render={({ field, fieldState }) => (
							<FieldGroup>
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="name">
										Número
									</FieldLabel>

									<Input
										{...field}
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>	
							</FieldGroup>
					)}
				/>

				<Controller
					control={form.control}
					name="complement"
					render={({ field, fieldState }) => (
							<FieldGroup>
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="name">
										Complemento
									</FieldLabel>

									<Input
										{...field}
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>	
							</FieldGroup>
					)}
				/>

				<Controller
					control={form.control}
					name="district"
					render={({ field, fieldState }) => (
							<FieldGroup>
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="name">
										Bairro
									</FieldLabel>

									<Input
										{...field}
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>	
							</FieldGroup>
					)}
				/>

				<Controller
					control={form.control}
					name="city"
					render={({ field, fieldState }) => (
							<FieldGroup>
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="name">
										Cidade
									</FieldLabel>

									<Input
										{...field}
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>	
							</FieldGroup>
					)}
				/>

				<Controller
					control={form.control}
					name="state"
					render={({ field, fieldState }) => (
							<FieldGroup>
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="name">
										Estado
									</FieldLabel>

									<Select defaultValue={field.value} onValueChange={field.onChange}>
										<SelectTrigger>
											<SelectValue placeholder="Estado"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="SP">São Paulo</SelectItem>
											<SelectItem value="RJ">Rio de Janeiro</SelectItem>
											<SelectItem value="CE">Ceará</SelectItem>
											<SelectItem value="DF">Distrito Federal</SelectItem>
										</SelectContent>
									</Select>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>	
							</FieldGroup>
					)}
				/>
			</div>

					<div className="flex justify-between mt-4">
						<Button variant="link" onClick={() => setStep("user")}>Voltar</Button>
						<Button type="submit">Concluir</Button>
					</div>
		</form>
	);
};