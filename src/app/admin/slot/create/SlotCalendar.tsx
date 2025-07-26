"use client";

import { useEffect, useState } from "react";
import { Slot } from "@/prisma/generated";
import { Indicator } from "@mantine/core";
import { DatePicker, DatePickerProps } from "@mantine/dates";
import dayjs from "dayjs";
import { useMappedState } from "@/hooks/useMappedState";

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

export type SlotCalendarProps = {
	slots: Slot[];
	name: string;
};

export function SlotCalendar(props: SlotCalendarProps) {
	const today = new Date();

	const [value, setValue] = useState<string | null>(null);

	return (
		<div style={{ position: "relative" }}>
			<DatePicker
				value={value}
				onChange={setValue}
				minDate={today}
				maxLevel="month"
				firstDayOfWeek={1}
				renderDay={renderDay(props.slots)}
			/>
			{props.name && (
				<input
					type="date"
					name={props.name}
					value={value || ""}
					style={{
						width: 1,
						height: 1,
						opacity: 0,
						position: "absolute",
						top: 0,
						left: 0,
					}}
					required
				/>
			)}
		</div>
	);
}
