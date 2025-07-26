import { handleRegistration } from "@/action/handleRegistration";
import { Slot } from "@/prisma/generated";
import {
	Fieldset,
	Button,
	Anchor,
	Checkbox,
	Stack,
	Text,
	Group,
	TextInput,
} from "@mantine/core";
import dayjs from "dayjs";

export type StepConfirmProps = {
	selectedSlot: Slot;
	email: string;
	onPrev: () => void;
};

export function StepConfirm({ onPrev, selectedSlot, email }: StepConfirmProps) {
	const date = dayjs(selectedSlot.date);
	const formattedDate = date.format("DD.MM.YYYY");
	const weekDay = date.format("dddd");

	return (
		<form action={handleRegistration}>
			<Fieldset>
				<input type="hidden" name="cisco-email" value={email} />
				<input type="hidden" name="slot-id" value={selectedSlot.id} />
				<Stack gap="xl">
					<Fieldset legend="Registration">
						<Stack gap="md">
							<TextInput readOnly label="Cisco E-mail" value={email} />
							<TextInput
								readOnly
								label="Slot"
								value={`${selectedSlot.type} | ${weekDay} ${formattedDate} | ${selectedSlot.startTime} - ${selectedSlot.endTime}`}
							/>
						</Stack>
					</Fieldset>

					<Checkbox
						required
						label={
							<>
								Please confirm that you have read and understood the pinned
								messages on the
								<br />
								<Anchor href="webexteams://im?space=d32e50f0-d597-11ee-81e0-efc84970601f">
									horseback riding space
								</Anchor>
								<Text component="span" c="red" inherit>
									{" "}
									*
								</Text>
							</>
						}
					/>
				</Stack>
			</Fieldset>
			<Group justify="space-between" mt="lg">
				<Button variant="outline" onClick={onPrev}>
					Back
				</Button>
				<Button type="submit">Submit</Button>
			</Group>
		</form>
	);
}
