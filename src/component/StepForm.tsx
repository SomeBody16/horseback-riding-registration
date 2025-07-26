import { useEffect } from "react";
import {
  Fieldset,
  Button,
  Stack,
  TextInput,
  Group,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

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

export function StepForm(props: StepFormProps) {
	const [email, setEmail] = useLocalStorage({
		key: "cisco-email",
		defaultValue: "",
	});

	useEffect(() => {
		props.onEmailChange(email || "");
	}, [email, props]);

	const emailError =
		email && !isEmailValid(email) ? "Invalid email address" : undefined;

	return (
		<Fieldset style={{ width: 600 }}>
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
				<Group justify="space-between">
					<Button variant="outline" onClick={props.onPrev}>
						Back
					</Button>
					<Button onClick={props.onNext} disabled={!email}>
						Next
					</Button>
				</Group>
			</Stack>
		</Fieldset>
	);
}
