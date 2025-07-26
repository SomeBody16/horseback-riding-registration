"use client";

import {
	Container,
	Title,
	Card,
	NumberInput,
	Button,
	Group,
	Stack,
	Select,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { createSlot } from "@/action/slots";
import { SlotCalendar } from "./SlotCalendar";
import { Slot } from "@/prisma/generated";
import { slotTypes } from "../slotTypes";
import { useNotificationAction } from "@/hooks/useNotificationAction";

export type CreateFormProps = {
	slots: Slot[];
};

export function CreateForm({ slots }: CreateFormProps) {
	const [, createSlotAction, pending] = useNotificationAction(createSlot);

	return (
		<Container size="md">
			<Stack gap="lg">
				{/* Header */}
				<Group>
					<Button
						component={Link}
						href="/admin/slot"
						variant="light"
						leftSection={<IconArrowLeft size="1rem" />}
					>
						Back to Slots
					</Button>
				</Group>

				{/* Form Card */}
				<Card shadow="sm" padding="xl" radius="md" withBorder>
					<Stack gap="lg">
						<Title order={1}>Create New Slot</Title>

						<form action={createSlotAction}>
							<Group grow>
								<SlotCalendar name="date" slots={slots} />
								<Stack gap="md">
									<Group grow>
										<TimeInput
											name="startTime"
											label="Start Time"
											placeholder="Start time"
											required
										/>
										<TimeInput
											name="endTime"
											label="End Time"
											placeholder="End time"
											required
										/>
									</Group>

									<Select
										name="type"
										label="Type"
										placeholder="Select slot type"
										required
										data={slotTypes}
									/>

									<NumberInput
										name="limit"
										label="Participant Limit"
										placeholder="Maximum number of participants"
										min={1}
										required
									/>
								</Stack>
							</Group>
							<Group justify="flex-end" gap="md" mt="md">
								<Button
									component={Link}
									href="/admin/slot"
									variant="light"
									color="gray"
								>
									Cancel
								</Button>
								<Button type="submit" disabled={pending} loading={pending}>
									Create Slot
								</Button>
							</Group>
						</form>
					</Stack>
				</Card>
			</Stack>
		</Container>
	);
}
