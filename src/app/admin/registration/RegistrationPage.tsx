"use client";

import {
	Container,
	Title,
	Card,
	Group,
	Stack,
	Button,
	Text,
	Paper,
	ScrollArea,
} from "@mantine/core";
import { IconCopy, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Registration, Slot } from "@/prisma/generated";
import dayjs from "dayjs";
import { SlotCalendar } from "./SlotCalendar";

export type RegistrationPageProps = {
	slots: (Slot & { registrations: Registration[] })[];
};

export function RegistrationPage({ slots }: RegistrationPageProps) {
	const [selectedDates, setSelectedDates] = useState<string[]>([]);

	const registrationText = useMemo(() => {
		if (selectedDates.length === 0) return "";

		const groupedByDate = selectedDates.reduce((acc, date) => {
			const dateKey = dayjs(date).format("YYYY-MM-DD");
			const slotsForDate = slots.filter((slot) =>
				dayjs(slot.date).isSame(date, "day")
			);

			if (slotsForDate.length > 0) {
				acc[dateKey] = {
					date: dayjs(date).toDate(),
					slots: slotsForDate,
				};
			}

			return acc;
		}, {} as Record<string, { date: Date; slots: (Slot & { registrations: Registration[] })[] }>);

		return Object.values(groupedByDate)
			.sort((a, b) => a.date.getTime() - b.date.getTime())
			.map(({ date, slots }) => {
				const formattedDate = dayjs(date).format("DD.MM.YYYY");
				const weekDay = dayjs(date).format("dddd");

				const registrationsText = slots
					.sort((a, b) => a.startTime.localeCompare(b.startTime))
					.map((slot) => {
						const registrations = slot.registrations || [];
						return registrations
							.map((reg) => `${slot.startTime} - ${reg.firstName} ${reg.lastName}`)
							.join("\n");
					})
					.filter(Boolean)
					.join("\n");

				return `${formattedDate} ${weekDay}\n${registrationsText}`;
			})
			.join("\n\n");
	}, [selectedDates, slots]);

	const handleCopy = async () => {
		if (registrationText) {
			try {
				await navigator.clipboard.writeText(registrationText);
			} catch (err) {
				console.error("Failed to copy text: ", err);
			}
		}
	};

	return (
		<Container size="lg">
			<Stack gap="lg">
				{/* Header */}
				<Group>
					<Button
						component={Link}
						href="/admin"
						variant="light"
						leftSection={<IconArrowLeft size="1rem" />}
					>
						Back to Admin
					</Button>
				</Group>

				{/* Main Content */}
				<Group align="flex-start" gap="xl">
					{/* Calendar Card */}
					<Card shadow="sm" padding="xl" radius="md" withBorder>
						<Stack gap="lg">
							<Title order={2}>Select Dates</Title>
							<SlotCalendar
								slots={slots}
								value={selectedDates}
								onChange={setSelectedDates}
							/>
							{/* <DatePicker
								type="multiple"
								value={selectedDates}
								onChange={setSelectedDates}
								placeholder="Select dates to view registrations"
								clearable
							/> */}
						</Stack>
					</Card>

					{/* Registration Display */}
					<Card
						shadow="sm"
						padding="xl"
						radius="md"
						withBorder
						style={{ flex: 1 }}
					>
						<Stack gap="lg">
							<Group justify="space-between">
								<Title order={2}>Registrations</Title>
								{registrationText && (
									<Button
										leftSection={<IconCopy size="1rem" />}
										onClick={handleCopy}
										variant="light"
									>
										Copy
									</Button>
								)}
							</Group>

							{registrationText ? (
								<Paper p="md" withBorder>
									<ScrollArea h={400}>
										<Text style={{ whiteSpace: "pre-line" }} size="sm">
											{registrationText}
										</Text>
									</ScrollArea>
								</Paper>
							) : (
								<Paper p="md" withBorder>
									<Text c="dimmed" ta="center">
										Select dates to view registrations
									</Text>
								</Paper>
							)}
						</Stack>
					</Card>
				</Group>
			</Stack>
		</Container>
	);
}
