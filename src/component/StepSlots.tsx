import { useEffect, useState } from "react";
import { Slot } from "@/prisma/generated";
import { Fieldset, Button, Group, Grid } from "@mantine/core";
import { StepSlotsDate } from "./StepSlots.date";
import { StepSlotsTime } from "./StepSlots.time";

export type StepSlotsProps = {
	slots: Slot[];
	value: Slot | undefined;
	onChange: (slot: Slot | undefined) => void;
	onNext: () => void;
};

export function StepSlots(props: StepSlotsProps) {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		props.value?.date
	);
	const [selectedSlot, setSelectedSlot] = useState<Slot | undefined>(
		props.value
	);

	useEffect(() => {
		props.onChange(selectedSlot);
	}, [selectedSlot, props]);

	return (
		<>
			<Fieldset style={{ width: 600 }}>
				<Grid gutter="lg">
					<Grid.Col span={6}>
						<StepSlotsDate
							slots={props.slots}
							value={selectedDate}
							onChange={setSelectedDate}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						{selectedDate !== null && (
							<StepSlotsTime
								slots={props.slots}
								selectedDate={selectedDate}
								value={selectedSlot}
								onChange={setSelectedSlot}
							/>
						)}
					</Grid.Col>
				</Grid>
			</Fieldset>
			<Group justify="flex-end" mt="lg">
				<Button onClick={props.onNext} disabled={selectedSlot === undefined}>
					Next
				</Button>
			</Group>
		</>
	);
}
