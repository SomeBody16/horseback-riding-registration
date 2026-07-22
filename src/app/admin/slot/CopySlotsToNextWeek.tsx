"use client";

import { Registration, Slot } from "@/prisma/generated";
import {
	Button,
	Checkbox,
	Group,
	Modal,
	Stack,
	Text,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { IconCopy } from "@tabler/icons-react";
import { format, addDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { notifications } from "@mantine/notifications";
import { copySlotsToNextWeek } from "@/action/slots";
import { getMondayAt10OfWeek } from "@/lib/slotVisibility";

function toDateValue(value: string | Date | null, fallback: Date): Date {
	if (!value) return fallback;
	return value instanceof Date ? value : new Date(value);
}

export interface CopySlotsToNextWeekProps {
	readonly slots: (Slot & { registrations: Registration[] })[];
}

type CopyStep = "select" | "visibleSince";

function getDefaultVisibleSince(
	selectedSlots: (Slot & { registrations: Registration[] })[]
): Date {
	const earliestTargetDate = selectedSlots.reduce((earliest, slot) => {
		const targetDate = addDays(slot.date, 7);
		return targetDate < earliest ? targetDate : earliest;
	}, addDays(selectedSlots[0].date, 7));

	return getMondayAt10OfWeek(earliestTargetDate);
}

export default function CopySlotsToNextWeek({ slots }: CopySlotsToNextWeekProps) {
	const router = useRouter();
	const [opened, setOpened] = useState(false);
	const [step, setStep] = useState<CopyStep>("select");
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const [visibleSince, setVisibleSince] = useState<Date>(new Date());
	const [pending, setPending] = useState(false);

	const selectedSlots = useMemo(
		() => slots.filter((slot) => selectedIds.includes(slot.id)),
		[slots, selectedIds]
	);

	const handleOpen = useCallback(() => {
		setSelectedIds([]);
		setStep("select");
		setOpened(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpened(false);
		setSelectedIds([]);
		setStep("select");
	}, []);

	const toggleSlot = useCallback((id: number) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	}, []);

	const selectAll = useCallback(() => {
		setSelectedIds(slots.map((s) => s.id));
	}, [slots]);

	const selectNone = useCallback(() => {
		setSelectedIds([]);
	}, []);

	const handleContinue = useCallback(() => {
		if (selectedIds.length === 0) {
			notifications.show({
				title: "No slots selected",
				message: "Select at least one slot to copy.",
				color: "yellow",
			});
			return;
		}

		setVisibleSince(getDefaultVisibleSince(selectedSlots));
		setStep("visibleSince");
	}, [selectedIds.length, selectedSlots]);

	const handleConfirm = useCallback(async () => {
		setPending(true);
		try {
			const { count } = await copySlotsToNextWeek(selectedIds, visibleSince);
			notifications.show({
				title: "Slots copied",
				message: `${count} slot${count === 1 ? "" : "s"} copied to next week.`,
				color: "green",
			});
			handleClose();
			router.refresh();
		} catch (err) {
			notifications.show({
				title: "Copy failed",
				message: err instanceof Error ? err.message : "Could not copy slots.",
				color: "red",
			});
		} finally {
			setPending(false);
		}
	}, [selectedIds, visibleSince, handleClose, router]);

	return (
		<>
			<Button
				leftSection={<IconCopy size="1rem" />}
				variant="light"
				size="md"
				onClick={handleOpen}
				disabled={slots.length === 0}
			>
				Copy for next week
			</Button>

			<Modal
				opened={opened}
				onClose={handleClose}
				title={
					step === "select"
						? "Copy slots to next week"
						: "Set visible since"
				}
				size="md"
			>
				{step === "select" ? (
					<Stack gap="md">
						<Text size="sm" c="dimmed">
							Select slots to copy. New slots will have the same time and type;
							registrations are not copied.
						</Text>

						<Group gap="xs">
							<Button variant="subtle" size="xs" onClick={selectAll}>
								Select all
							</Button>
							<Button variant="subtle" size="xs" onClick={selectNone}>
								Select none
							</Button>
						</Group>

						<Stack gap="xs">
							{slots.map((slot) => (
								<Checkbox
									key={slot.id}
									label={
										<>
											{format(slot.date, "EEE, MMM d")} · {slot.startTime}–
											{slot.endTime} · {slot.type} →{" "}
											{format(addDays(slot.date, 7), "EEE, MMM d")}
										</>
									}
									checked={selectedIds.includes(slot.id)}
									onChange={() => toggleSlot(slot.id)}
								/>
							))}
						</Stack>

						<Group justify="flex-end" gap="sm">
							<Button variant="default" onClick={handleClose}>
								Cancel
							</Button>
							<Button
								onClick={handleContinue}
								disabled={selectedIds.length === 0}
							>
								Continue
							</Button>
						</Group>
					</Stack>
				) : (
					<Stack gap="md">
						<Text size="sm" c="dimmed">
							Set when the copied slots become visible for registration.
							Defaults to Monday at 10:00 of the target week.
						</Text>

						<DateTimePicker
							label="Visible since"
							value={visibleSince}
							onChange={(value) =>
								setVisibleSince(toDateValue(value, visibleSince))
							}
							required
						/>

						<Group justify="flex-end" gap="sm">
							<Button variant="default" onClick={() => setStep("select")}>
								Back
							</Button>
							<Button onClick={handleConfirm} loading={pending}>
								Copy {selectedIds.length} slot
								{selectedIds.length !== 1 ? "s" : ""}
							</Button>
						</Group>
					</Stack>
				)}
			</Modal>
		</>
	);
}
