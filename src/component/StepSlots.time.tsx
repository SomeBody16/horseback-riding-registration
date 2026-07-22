import { useEffect, useMemo } from "react";
import { Slot } from "@/prisma/generated";
import { Group, Radio, ScrollArea, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useMappedState } from "@/hooks/useMappedState";
import { formatRegistrationOpensAt, isSlotVisible } from "@/lib/slotVisibility";

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
		(selectedId) => {
			const slot = props.slots.find((item) => item.id.toString() === selectedId);
			if (!slot || !isSlotVisible(slot.visibleSince)) {
				return undefined;
			}
			return slot;
		}
	);
	useEffect(() => {
		props.onChange(value);
	}, [value, props]);

	return (
		<Radio.Group value={value?.id.toString()} onChange={setValue}>
			<ScrollArea h={250}>
				<Stack gap="xs" pt="xs">
					{availableSlots.map((slot) => {
						const visible = isSlotVisible(slot.visibleSince);

						return (
							<Radio.Card
								key={slot.id}
								radius="md"
								value={slot.id.toString()}
								disabled={!visible}
							>
								<Group wrap="nowrap" align="flex-start" gap="xs" p="xs">
									<Radio.Indicator disabled={!visible} />
									<div>
										<Text size="sm" fw={700} c={visible ? undefined : "dimmed"}>
											{slot.startTime} - {slot.endTime}
										</Text>
										<Text c={visible ? "gray.6" : "dimmed"}>{slot.type}</Text>
										{!visible && (
											<Text size="xs" c="blue" mt={4}>
												Registration opens {formatRegistrationOpensAt(slot.visibleSince)}
											</Text>
										)}
									</div>
								</Group>
							</Radio.Card>
						);
					})}
				</Stack>
			</ScrollArea>
		</Radio.Group>
	);
}
