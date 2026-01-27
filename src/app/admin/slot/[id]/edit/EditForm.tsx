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
	TextInput,
	ActionIcon,
	Text,
	Modal,
} from "@mantine/core";
import { TimeInput, DatePickerInput } from "@mantine/dates";
import { IconArrowLeft, IconTrash, IconEdit, IconCheck, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { updateSlot, removeRegistration, updateRegistration } from "@/action/slots";
import { Slot, Registration } from "@/prisma/generated";
import { slotTypes } from "../../slotTypes";
import { useNotificationAction } from "@/hooks/useNotificationAction";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

interface EditFormProps {
	readonly slot: Slot & { registrations: Registration[] };
}

interface EditingRegistration {
	id: number;
	firstName: string;
	lastName: string;
}

export function EditForm({ slot }: EditFormProps) {
	const [, updateSlotAction, updatePending] = useNotificationAction(updateSlot);
	const [, updateRegistrationAction, updateRegPending] = useNotificationAction(updateRegistration);
	const [editingReg, setEditingReg] = useState<EditingRegistration | null>(null);
	const [deleteRegId, setDeleteRegId] = useState<number | null>(null);
	const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

	const handleEditRegistration = (reg: Registration): void => {
		setEditingReg({
			id: reg.id,
			firstName: reg.firstName,
			lastName: reg.lastName,
		});
	};

	const handleCancelEdit = (): void => {
		setEditingReg(null);
	};

	const handleDeleteClick = (regId: number): void => {
		setDeleteRegId(regId);
		openDeleteModal();
	};

	return (
		<Container size="md">
			<Stack gap="lg">
				{/* Header */}
				<Group>
					<Button
						component={Link}
						href={`/admin/slot/${slot.id}`}
						variant="light"
						leftSection={<IconArrowLeft size="1rem" />}
					>
						Back to Slot Details
					</Button>
				</Group>

				{/* Slot Edit Form Card */}
				<Card shadow="sm" padding="xl" radius="md" withBorder>
					<Stack gap="lg">
						<Title order={2}>Edit Slot #{slot.id}</Title>

						<form action={updateSlotAction}>
							<input type="hidden" name="slotId" value={slot.id} />
							<Stack gap="md">
								<DatePickerInput
									name="date"
									label="Date"
									placeholder="Select date"
									defaultValue={new Date(slot.date)}
									required
								/>

								<Group grow>
									<TimeInput
										name="startTime"
										label="Start Time"
										placeholder="Start time"
										defaultValue={slot.startTime}
										required
									/>
									<TimeInput
										name="endTime"
										label="End Time"
										placeholder="End time"
										defaultValue={slot.endTime}
										required
									/>
								</Group>

								<Select
									name="type"
									label="Type"
									placeholder="Select slot type"
									defaultValue={slot.type}
									required
									data={slotTypes}
								/>

								<NumberInput
									name="limit"
									label="Participant Limit"
									placeholder="Maximum number of participants"
									defaultValue={slot.limit}
									min={1}
									required
								/>
							</Stack>
							<Group justify="flex-end" gap="md" mt="lg">
								<Button
									component={Link}
									href={`/admin/slot/${slot.id}`}
									variant="light"
									color="gray"
								>
									Cancel
								</Button>
								<Button type="submit" disabled={updatePending} loading={updatePending}>
									Save Changes
								</Button>
							</Group>
						</form>
					</Stack>
				</Card>

				{/* Registrations Management Card */}
				<Card shadow="sm" padding="xl" radius="md" withBorder>
					<Stack gap="lg">
						<Title order={2}>Manage Participants</Title>

						{slot.registrations.length === 0 ? (
							<Text c="dimmed">No participants registered for this slot.</Text>
						) : (
							<Stack gap="sm">
								{slot.registrations.map((registration) => (
									<Card
										key={registration.id}
										shadow="xs"
										padding="sm"
										radius="sm"
										withBorder
									>
										{editingReg?.id === registration.id ? (
											<form action={updateRegistrationAction}>
												<input type="hidden" name="registrationId" value={registration.id} />
												<input type="hidden" name="slotId" value={slot.id} />
												<Group justify="space-between" align="flex-end">
													<Group grow style={{ flex: 1 }}>
														<TextInput
															name="firstName"
															label="First Name"
															placeholder="First name"
															defaultValue={editingReg.firstName}
															required
															size="sm"
														/>
														<TextInput
															name="lastName"
															label="Last Name"
															placeholder="Last name"
															defaultValue={editingReg.lastName}
															required
															size="sm"
														/>
													</Group>
													<Group gap="xs">
														<ActionIcon
															type="submit"
															variant="light"
															color="green"
															size="lg"
															title="Save changes"
															loading={updateRegPending}
														>
															<IconCheck size="1rem" />
														</ActionIcon>
														<ActionIcon
															variant="light"
															color="gray"
															size="lg"
															title="Cancel"
															onClick={handleCancelEdit}
														>
															<IconX size="1rem" />
														</ActionIcon>
													</Group>
												</Group>
											</form>
										) : (
											<Group justify="space-between">
												<Text>
													{registration.firstName} {registration.lastName}
												</Text>
												<Group gap="xs">
													<ActionIcon
														variant="light"
														color="blue"
														size="sm"
														title="Edit participant"
														onClick={() => handleEditRegistration(registration)}
													>
														<IconEdit size="1rem" />
													</ActionIcon>
													<ActionIcon
														variant="light"
														color="red"
														size="sm"
														title="Remove participant"
														onClick={() => handleDeleteClick(registration.id)}
													>
														<IconTrash size="1rem" />
													</ActionIcon>
												</Group>
											</Group>
										)}
									</Card>
								))}
							</Stack>
						)}
					</Stack>
				</Card>
			</Stack>

			{/* Delete Confirmation Modal */}
			<Modal
				opened={deleteModalOpened}
				onClose={closeDeleteModal}
				title="Remove Participant"
				centered
			>
				<Stack gap="md">
					<Text>Are you sure you want to remove this participant from the slot?</Text>
					<Group justify="flex-end" gap="sm">
						<Button variant="light" color="gray" onClick={closeDeleteModal}>
							Cancel
						</Button>
						<form action={removeRegistration}>
							<input type="hidden" name="registrationId" value={deleteRegId ?? ""} />
							<input type="hidden" name="slotId" value={slot.id} />
							<Button type="submit" color="red">
								Remove
							</Button>
						</form>
					</Group>
				</Stack>
			</Modal>
		</Container>
	);
}
