"use client";

import { useEffect } from "react";
import { Slot } from "@/prisma/generated";
import { Indicator } from "@mantine/core";
import { DatePicker, DatePickerProps } from "@mantine/dates";
import dayjs from "dayjs";
import { useMappedState } from "@/hooks/useMappedState";

const getDayProps = (slots: Slot[]) => {
	const render: DatePickerProps["getDayProps"] = (date) => {
		const isSlotAvailable = slots.some((slot) =>
			dayjs(slot.date).isSame(date, "day")
		);

		return { disabled: !isSlotAvailable };
	};
	return render;
};

const renderDay = (slots: Slot[]) => {
	const render: DatePickerProps["renderDay"] = (date) => {
		const day = dayjs(date).date();
		const availableSlotsCount = slots.filter((slot) =>
			dayjs(slot.date).isSame(date, "day")
		).length;

		return (
			<Indicator
				size={16}
				label={availableSlotsCount}
				processing
				color="green"
				offset={-7}
				disabled={availableSlotsCount === 0}
			>
				<div>{day}</div>
			</Indicator>
		);
	};
	return render;
};

export type StepSlotsDateProps = {
	slots: Slot[];
	value: Date | undefined;
	onChange: (date: Date | undefined) => void;
};

export function StepSlotsDate(props: StepSlotsDateProps) {
	const today = new Date();
	const firstAvailableDate = dayjs(props.slots[0]?.date).toDate();

	const [value, setValue] = useMappedState<Date, string>(
		props.value?.toISOString(),
		(value) => dayjs(value).toDate()
	);
	useEffect(() => {
		props.onChange(value);
	}, [value, props]);

	return (
		<DatePicker
			value={value}
			onChange={setValue}
			getDayProps={getDayProps(props.slots)}
			defaultDate={firstAvailableDate}
			minDate={today}
			maxLevel="month"
			firstDayOfWeek={1}
			renderDay={renderDay(props.slots)}
		/>
	);
}
