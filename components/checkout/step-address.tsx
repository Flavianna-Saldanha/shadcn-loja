import { CheckoutStep } from "@/src/types/checkout-steps";
import { Dispatch, SetStateAction } from "react";

type Props = {
	setStep: Dispatch<SetStateAction<CheckoutStep>>;
};


export const StepAddress = ({ setStep }: Props) => {
	return (
		<div>
			...
		</div>
	);
}