"use client";

import { DatePickerInput } from "@mantine/dates";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export interface DashboardDateFilterProps {
	readonly from: string | null;
	readonly to: string | null;
}

export default function DashboardDateFilter({ from, to }: DashboardDateFilterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleChange = (value: [string | null, string | null]): void => {
		const params = new URLSearchParams(searchParams.toString());
		const [nextFrom, nextTo] = value;

		if (nextFrom) {
			params.set("from", nextFrom);
		} else {
			params.delete("from");
		}

		if (nextTo) {
			params.set("to", nextTo);
		} else {
			params.delete("to");
		}

		const query = params.toString();
		router.push(query ? `${pathname}?${query}` : pathname);
	};

	return (
		<DatePickerInput
			type="range"
			label="Time range"
			placeholder="Select date range"
			value={[from, to]}
			onChange={handleChange}
			clearable
			firstDayOfWeek={1}
			maw={320}
		/>
	);
}
