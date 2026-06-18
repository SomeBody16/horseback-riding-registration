"use client";

import { Registration, Slot } from "@/prisma/generated";
import { Stack } from "@mantine/core";
import { Indicator } from "@mantine/core";
import { DatePicker, DatePickerProps } from "@mantine/dates";
import dayjs from "dayjs";

const renderDay = (slots: (Slot & { registrations: Registration[] })[]) => {
	const render: DatePickerProps["renderDay"] = (date) => {
		const day = dayjs(date).date();
		const daySlots = slots.filter((slot) =>
			dayjs(slot.date).isSame(date, "day"),
		);

		const registeredSlots = daySlots.filter(
			(slot) => slot.registrations.length > 0,
		);
		const isFull = registeredSlots.length === daySlots.length;
		const color = isFull ? "green" : "yellow";
		const isPast = dayjs(date).isBefore(dayjs(), "day");

		return (
			<Indicator
				size={16}
				position="top-end"
				offset={-7}
				color={color}
				label={
					daySlots.length > 0
						? `${registeredSlots.length}/${daySlots.length}`
						: undefined
				}
				disabled={daySlots.length === 0}
				processing={!isPast}
			>
				<div>{day}</div>
			</Indicator>
		);
	};
	return render;
};

export type SlotCalendarProps = {
	slots: (Slot & { registrations: Registration[] })[];
	value: string[];
	onChange: (value: string[]) => void;
};

export function SlotCalendar(props: SlotCalendarProps) {
	return (
		<Stack align="center" gap="sm">
			<DatePicker
				type="multiple"
				value={props.value}
				onChange={props.onChange}
				maxLevel="month"
				firstDayOfWeek={1}
				renderDay={renderDay(props.slots)}
			/>
		</Stack>
	);
}
