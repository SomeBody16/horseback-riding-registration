"use client";

import { Registration, Slot } from "@/prisma/generated";
import { Indicator } from "@mantine/core";
import { DatePicker, DatePickerProps } from "@mantine/dates";
import dayjs from "dayjs";

const renderDay = (slots: (Slot & { registrations: Registration[] })[]) => {
	const render: DatePickerProps["renderDay"] = (date) => {
		const day = dayjs(date).date();
		const registrationsCount = slots
			.filter((slot) => dayjs(slot.date).isSame(date, "day"))
			.map((slot) => slot.registrations.length)
			.reduce((acc, curr) => acc + curr, 0);

		return (
			<Indicator
				size={16}
				label={registrationsCount}
				processing
				color="green"
				offset={-7}
				disabled={registrationsCount === 0}
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
		<DatePicker
			type="multiple"
			value={props.value}
			onChange={props.onChange}
			maxLevel="month"
			firstDayOfWeek={1}
			renderDay={renderDay(props.slots)}
		/>
	);
}
