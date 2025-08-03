"use client";

import { Slot } from "@/prisma/generated";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";

export function SlotCalendarDisplay({ slot }: { slot: Slot }) {
	return (
		<DatePicker
			value={slot.date}
			maxLevel="month"
			firstDayOfWeek={1}
			excludeDate={(date) => {
				return !dayjs(date).isSame(dayjs(slot.date), "day");
			}}
		/>
	);
}
