import { Slot } from "@/prisma/generated";
import { Fieldset, Button } from "@mantine/core";
import { StepSlotsDate } from "./StepSlots.date";
import { StepSlotsTime } from "./StepSlots.time";
import { useEffect, useState } from "react";

export type StepSlotsProps = {
	slots: Slot[];
	onChange: (slots: Slot | undefined) => void;
	onNext: () => void;
};

export function StepSlots({ slots, onChange, onNext }: StepSlotsProps) {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedSlot, setSelectedSlot] = useState<Slot>();
	useEffect(() => {
		onChange(selectedSlot);
	}, [selectedSlot]);

	return (
		<Fieldset className="flex flex-col gap-6 w-2xl" pos="relative">
			<div className="flex justify-around gap-6">
				<div className="w-66">
					<StepSlotsDate slots={slots} onChange={setSelectedDate} />
				</div>
				<div className="w-66">
					{selectedDate !== null && (
						<StepSlotsTime
							slots={slots}
							selectedDate={selectedDate}
							onChange={setSelectedSlot}
						/>
					)}
				</div>
			</div>
			<div className="flex justify-between gap-4">
				<span></span>
				<Button
					className="w-2xl"
					onClick={onNext}
					disabled={selectedSlot === undefined}
				>
					Next
				</Button>
			</div>
		</Fieldset>
	);
}
