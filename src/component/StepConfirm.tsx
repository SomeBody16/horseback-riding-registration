import { Slot } from "@/prisma/generated";
import {
	Fieldset,
	Button,
	Anchor,
	Checkbox,
	Stack,
	Text,
	List,
	TextInput,
} from "@mantine/core";
import dayjs from "dayjs";

export type StepConfirmProps = {
	selectedSlot: Slot;
	email: string;
	//
	onPrev: () => void;
	onNext: () => void;
};

export function StepConfirm({
	onPrev,
	onNext,
	selectedSlot,
	email,
}: StepConfirmProps) {
	const date = dayjs(selectedSlot.date);
	const formattedDate = date.format("DD.MM.YYYY");
	const weekDay = date.format("dddd");

	return (
		<Fieldset className="flex flex-col gap-6 w-2xl">
			<Stack gap="xl">
				<Fieldset legend="Registration" className="flex flex-col gap-2">
					<TextInput readOnly label="Cisco E-mail" value={email} />
					<TextInput
						readOnly
						label="Slot"
						value={`${selectedSlot.type} | ${weekDay} ${formattedDate} | ${selectedSlot.startTime} - ${selectedSlot.endTime}`}
					/>
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
							<span className="text-red-500"> *</span>
						</>
					}
				/>
			</Stack>
			<div className="flex justify-between gap-4">
				<Button variant="outline" className="w-2xl" onClick={onPrev}>
					Back
				</Button>
				<Button className="w-2xl" onClick={onNext}>
					Submit
				</Button>
			</div>
		</Fieldset>
	);
}
