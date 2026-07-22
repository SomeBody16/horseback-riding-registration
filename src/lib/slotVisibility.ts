import dayjs from "dayjs";
import { setHours, setMinutes, setSeconds, setMilliseconds, startOfWeek } from "date-fns";

export function getMondayAt10OfWeek(date: Date): Date {
	const monday = startOfWeek(date, { weekStartsOn: 1 });
	return setMilliseconds(setSeconds(setMinutes(setHours(monday, 10), 0), 0), 0);
}

export function isSlotVisible(visibleSince: Date, now: Date = new Date()): boolean {
	return dayjs(visibleSince).isSame(now) || dayjs(visibleSince).isBefore(now);
}

export function formatRegistrationOpensAt(visibleSince: Date): string {
	return dayjs(visibleSince).format("dddd, MMMM D [at] HH:mm");
}
