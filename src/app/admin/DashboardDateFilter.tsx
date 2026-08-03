"use client";

import { Group, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export interface DashboardDateFilterProps {
	readonly from: string | null;
	readonly to: string | null;
}

interface DateRange {
	readonly label: string;
	readonly from: string;
	readonly to: string;
}

/**
 * Cisco fiscal quarter date ranges. Fill these in manually.
 * `from`/`to` use the `YYYY-MM-DD` format.
 */
const FISCAL_QUARTERS: readonly DateRange[] = [
	// FY2026
	{ label: "Q1FY26", from: "2025-07-27", to: "2025-10-25" },
	{ label: "Q2FY26", from: "2025-10-26", to: "2026-01-24" },
	{ label: "Q3FY26", from: "2026-01-25", to: "2026-04-25" },
	{ label: "Q4FY26", from: "2026-04-26", to: "2026-07-25" },
	// FY2027
	{ label: "Q1FY27", from: "2026-07-26", to: "2026-10-24" },
	{ label: "Q2FY27", from: "2026-10-25", to: "2027-01-23" },
	{ label: "Q3FY27", from: "2027-01-24", to: "2027-05-01" },
	{ label: "Q4FY27", from: "2027-05-02", to: "2027-07-31" },
];

/** Build whole fiscal year ranges (Q1 `from` → Q4 `to`) from the quarters. */
function buildFiscalYears(quarters: readonly DateRange[]): DateRange[] {
	const byYear = new Map<string, { from?: string; to?: string }>();

	for (const quarter of quarters) {
		const match = /^Q(\d)F?Y(\d+)$/.exec(quarter.label);
		if (!match) {
			continue;
		}
		const [, quarterNumber, year] = match;
		const entry = byYear.get(year) ?? {};
		if (quarterNumber === "1") {
			entry.from = quarter.from;
		}
		if (quarterNumber === "4") {
			entry.to = quarter.to;
		}
		byYear.set(year, entry);
	}

	const years: DateRange[] = [];
	for (const [year, { from, to }] of byYear) {
		if (from && to) {
			years.push({ label: `FY${year}`, from, to });
		}
	}
	return years;
}

const FISCAL_YEARS: readonly DateRange[] = buildFiscalYears(FISCAL_QUARTERS);
const ALL_RANGES: readonly DateRange[] = [...FISCAL_QUARTERS, ...FISCAL_YEARS];

function currentQuarter(): DateRange | undefined {
	const today = dayjs().format("YYYY-MM-DD");
	return FISCAL_QUARTERS.find((quarter) => quarter.from <= today && today <= quarter.to);
}

export default function DashboardDateFilter({ from, to }: DashboardDateFilterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const pushRange = (
		nextFrom: string | null,
		nextTo: string | null,
		replace = false,
	): void => {
		const params = new URLSearchParams(searchParams.toString());

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
		const url = query ? `${pathname}?${query}` : pathname;
		if (replace) {
			router.replace(url);
		} else {
			router.push(url);
		}
	};

	// Default to the quarter we are currently within when no range is set.
	useEffect(() => {
		if (!from && !to) {
			const quarter = currentQuarter();
			if (quarter) {
				pushRange(quarter.from, quarter.to, true);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (value: [string | null, string | null]): void => {
		pushRange(value[0], value[1]);
	};

	const handleRangeChange = (value: string | null): void => {
		const range = ALL_RANGES.find((item) => item.label === value);
		pushRange(range?.from ?? null, range?.to ?? null);
	};

	const selectedRange =
		ALL_RANGES.find((item) => item.from === from && item.to === to)?.label ?? null;

	return (
		<Group align="flex-end" gap="sm">
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
			<Select
				label="Fiscal period"
				placeholder="Select period"
				data={[
					{ group: "Quarters", items: FISCAL_QUARTERS.map((item) => item.label) },
					{ group: "Years", items: FISCAL_YEARS.map((item) => item.label) },
				]}
				value={selectedRange}
				onChange={handleRangeChange}
				clearable
				maw={160}
			/>
		</Group>
	);
}
