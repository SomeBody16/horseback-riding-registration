import {
	Fieldset,
	Button,
	Anchor,
	Checkbox,
	Stack,
	TextInput,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";

/**
 * Check if the email is valid and contains @cisco.com
 */
const isEmailValid = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email) && email.endsWith("@cisco.com");
};

export type StepFormProps = {
	onEmailChange: (email: string) => void;
	onPrev: () => void;
	onNext: () => void;
};

export function StepForm({ onEmailChange, onPrev, onNext }: StepFormProps) {
	const [email, setEmail] = useLocalStorage({
		key: "cisco-email",
		defaultValue: "",
	});
	useEffect(() => {
		onEmailChange(email || "");
	}, [email]);

	const emailError = email
		? !isEmailValid(email)
			? "Invalid email address"
			: undefined
		: undefined;

	return (
		<Fieldset className="flex flex-col gap-6 w-2xl">
			<Stack gap="xl">
				<TextInput
					label="E-mail address"
					description="Please enter your Cisco E-mail"
					required
					placeholder="example@cisco.com"
					value={email || ""}
					onChange={(e) => setEmail(e.target.value)}
					error={emailError}
				/>
			</Stack>
			<div className="flex justify-between gap-4">
				<Button variant="outline" className="w-2xl" onClick={onPrev}>
					Back
				</Button>
				<Button className="w-2xl" onClick={onNext} disabled={!email}>
					Next
				</Button>
			</div>
		</Fieldset>
	);
}
