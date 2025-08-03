"use client";

import { Registration, Slot } from "@/prisma/generated";
import { Table, Badge, Group, ActionIcon, Anchor } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { format } from "date-fns";

export type SlotsTableProps = {
	slots: (Slot & { registrations: Registration[] })[];
};

export default function SlotsTable({ slots }: SlotsTableProps) {
	return (
		<>
			<Table striped highlightOnHover withTableBorder withColumnBorders>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>ID</Table.Th>
						<Table.Th>Date</Table.Th>
						<Table.Th>Time</Table.Th>
						<Table.Th>Type</Table.Th>
						<Table.Th>Registrations</Table.Th>
						<Table.Th>Actions</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{slots.map((slot) => (
						<Table.Tr key={slot.id}>
							<Table.Td>{slot.id}</Table.Td>
							<Table.Td>
								<Anchor href={`/admin/slot/${slot.id}`}>
									{format(slot.date, "EEEE, MMMM do, yyyy")}
								</Anchor>
							</Table.Td>
							<Table.Td>
								{slot.startTime} - {slot.endTime}
							</Table.Td>
							<Table.Td>
								<Badge variant="light" color="blue">
									{slot.type}
								</Badge>
							</Table.Td>
							<Table.Td>
								<Badge
									variant="light"
									color={
										slot.registrations.length >= slot.limit ? "red" : "green"
									}
								>
									{slot.registrations.length}/{slot.limit}
								</Badge>
							</Table.Td>
							<Table.Td>
								<Group gap="xs">
									<ActionIcon
										component={Link}
										href={`/admin/slot/${slot.id}`}
										variant="light"
										color="blue"
										size="sm"
										title="View details"
									>
										<IconEye size="1rem" />
									</ActionIcon>
									<ActionIcon
										component={Link}
										href={`/admin/slot/${slot.id}/delete`}
										variant="light"
										color="red"
										size="sm"
										title="Delete slot"
									>
										<IconTrash size="1rem" />
									</ActionIcon>
								</Group>
							</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>

			{slots.length === 0 && (
				<Table>
					<Table.Tbody>
						<Table.Tr>
							<Table.Td colSpan={7} ta="center" py="xl">
								No slots found. Create your first slot to get started.
							</Table.Td>
						</Table.Tr>
					</Table.Tbody>
				</Table>
			)}
		</>
	);
}
