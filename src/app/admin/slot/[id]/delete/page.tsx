import {
	Container,
	Title,
	Card,
	Button,
	Group,
	Stack,
	Text,
	Alert,
	Badge,
} from "@mantine/core";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconAlertTriangle } from "@tabler/icons-react";
import Link from "next/link";
import { deleteSlot, getSlot } from "@/action/slots";
import { format } from "date-fns";

interface DeleteSlotPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function DeleteSlotPage({ params }: DeleteSlotPageProps) {
	const { id } = await params;
	const slot = await getSlot(id);

	if (!slot) {
		notFound();
	}

	return (
		<Container size="md">
			<Stack gap="lg">
				{/* Header */}
				<Group>
					<Button
						component={Link}
						href={`/admin/slot/${id}`}
						variant="light"
						leftSection={<IconArrowLeft size="1rem" />}
					>
						Back to Slot Details
					</Button>
				</Group>

				{/* Confirmation Card */}
				<Card shadow="sm" padding="xl" radius="md" withBorder>
					<Stack gap="lg">
						<div>
							<Title order={1} c="red">
								Delete Slot
							</Title>
							<Text c="dimmed" size="lg">
								Are you sure you want to delete this slot?
							</Text>
						</div>

						<Alert
							icon={<IconAlertTriangle size="1rem" />}
							title="Warning"
							color="red"
							variant="light"
						>
							This action cannot be undone. All data associated with this slot
							will be permanently deleted.
						</Alert>

						{/* Slot Information Summary */}
						<Card shadow="xs" padding="md" radius="sm" withBorder>
							<Stack gap="md">
								<Title order={3}>Slot Information</Title>

								<Group>
									<Text fw={500} w={120}>
										ID:
									</Text>
									<Text>#{slot.id}</Text>
								</Group>

								<Group>
									<Text fw={500} w={120}>
										Date:
									</Text>
									<Text>{format(slot.date, "dd/MM/yyyy")}</Text>
								</Group>

								<Group>
									<Text fw={500} w={120}>
										Time:
									</Text>
									<Text>
										{slot.startTime} - {slot.endTime}
									</Text>
								</Group>

								<Group>
									<Text fw={500} w={120}>
										Type:
									</Text>
									<Badge variant="light" color="blue">
										{slot.type}
									</Badge>
								</Group>

								<Group>
									<Text fw={500} w={120}>
										Limit:
									</Text>
									<Text>{slot.limit} participants</Text>
								</Group>

								<Group>
									<Text fw={500} w={120}>
										Registrations:
									</Text>
									<Badge
										variant="light"
										color={
											slot.registrations.length >= slot.limit ? "red" : "green"
										}
									>
										{slot.registrations.length}/{slot.limit}
									</Badge>
								</Group>

								{slot.registrations.length > 0 && (
									<Alert
										title="Active Registrations"
										color="orange"
										variant="light"
									>
										This slot has {slot.registrations.length} active
										registration(s). Deleting this slot will also remove all
										associated registrations.
									</Alert>
								)}
							</Stack>
						</Card>

						{/* Confirmation Form */}
						<form action={deleteSlot}>
							<input type="hidden" name="slotId" value={id} />
							<Stack gap="md">
								<Group justify="flex-end" gap="md">
									<Button
										component="a"
										href={`/admin/slot/${id}`}
										variant="light"
										color="gray"
									>
										Cancel
									</Button>
									<Button type="submit" color="red">
										Confirm Delete
									</Button>
								</Group>
							</Stack>
						</form>
					</Stack>
				</Card>
			</Stack>
		</Container>
	);
}
