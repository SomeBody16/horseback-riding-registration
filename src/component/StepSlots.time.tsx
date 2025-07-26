import { useEffect, useMemo } from "react";
import { Slot } from "@/prisma/generated";
import { Group, Radio, ScrollArea, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useMappedState } from "@/hooks/useMappedState";

export type StepSlotsTimeProps = {
	slots: Slot[];
	selectedDate: Date | undefined;
	value: Slot | undefined;
	onChange: (value: Slot | undefined) => void;
};

export function StepSlotsTime(props: StepSlotsTimeProps) {
	const availableSlots = useMemo(() => {
		if (!props.selectedDate) return [];
		return props.slots.filter((slot) =>
			dayjs(slot.date).isSame(props.selectedDate, "day")
		);
	}, [props.selectedDate, props.slots]);

	const [value, setValue] = useMappedState<Slot | undefined, string>(
		props.value?.id?.toString(),
		(value) => props.slots.find((slot) => slot.id.toString() === value)
	);
	useEffect(() => {
		props.onChange(value);
	}, [value, props]);

	return (
		<Radio.Group value={value?.id.toString()} onChange={setValue}>
			<ScrollArea h={250}>
				<Stack gap="xs" pt="xs">
					{availableSlots.map((slot) => (
						<Radio.Card key={slot.id} radius="md" value={slot.id.toString()}>
							<Group wrap="nowrap" align="flex-start" gap="xs" p="xs">
								<Radio.Indicator />
								<div>
									<Text size="sm" fw={700}>
										{slot.startTime} - {slot.endTime}
									</Text>
									<Text c="gray.6">{slot.type}</Text>
								</div>
							</Group>
						</Radio.Card>
					))}
				</Stack>
			</ScrollArea>
		</Radio.Group>
	);
}
