import { useEffect } from "react";
import {
  Fieldset,
  Button,
  Stack,
  TextInput,
  Group,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

export type StepFormProps = {
	onFirstNameChange: (firstName: string) => void;
	onLastNameChange: (lastName: string) => void;
	onPrev: () => void;
	onNext: () => void;
};

export function StepForm(props: StepFormProps) {
	const [firstName, setFirstName] = useLocalStorage({
		key: "user-first-name",
		defaultValue: "",
	});

	const [lastName, setLastName] = useLocalStorage({
		key: "user-last-name",
		defaultValue: "",
	});

	useEffect(() => {
		props.onFirstNameChange(firstName || "");
	}, [firstName, props]);

	useEffect(() => {
		props.onLastNameChange(lastName || "");
	}, [lastName, props]);

	return (
		<>
			<Fieldset style={{ width: 600 }}>
				<Stack gap="xl">
					<TextInput
						label="First Name"
						description="Please enter your first name"
						required
						placeholder="John"
						value={firstName || ""}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<TextInput
						label="Last Name"
						description="Please enter your last name"
						required
						placeholder="Doe"
						value={lastName || ""}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</Stack>
			</Fieldset>
			<Group justify="space-between" mt="lg">
				<Button variant="outline" onClick={props.onPrev}>
					Back
				</Button>
				<Button onClick={props.onNext} disabled={!firstName || !lastName}>
					Next
				</Button>
			</Group>
		</>
	);
}
