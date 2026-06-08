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
import { IconCopy } from "@tabler/icons-react";
import { format, addDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { notifications } from "@mantine/notifications";
import { copySlotsToNextWeek } from "@/action/slots";

export interface CopySlotsToNextWeekProps {
	readonly slots: (Slot & { registrations: Registration[] })[];
}

export default function CopySlotsToNextWeek({ slots }: CopySlotsToNextWeekProps) {
	const router = useRouter();
	const [opened, setOpened] = useState(false);
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const [pending, setPending] = useState(false);

	const handleOpen = useCallback(() => {
		setSelectedIds([]);
		setOpened(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpened(false);
		setSelectedIds([]);
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

	const handleConfirm = useCallback(async () => {
		if (selectedIds.length === 0) {
			notifications.show({
				title: "No slots selected",
				message: "Select at least one slot to copy.",
				color: "yellow",
			});
			return;
		}
		setPending(true);
		try {
			const { count } = await copySlotsToNextWeek(selectedIds);
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
	}, [selectedIds, handleClose, router]);

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
				title="Copy slots to next week"
				size="md"
			>
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
							onClick={handleConfirm}
							loading={pending}
							disabled={selectedIds.length === 0}
						>
							Copy {selectedIds.length > 0 ? `${selectedIds.length} ` : ""}slot
							{selectedIds.length !== 1 ? "s" : ""}
						</Button>
					</Group>
				</Stack>
			</Modal>
		</>
	);
}
