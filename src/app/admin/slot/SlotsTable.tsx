"use client";

import { Registration, Slot } from "@/prisma/generated";
import { Table, Badge, Group, ActionIcon, Anchor, Pagination, Stack, Text } from "@mantine/core";
import { IconEye, IconTrash, IconEdit } from "@tabler/icons-react";
import Link from "next/link";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

export interface SlotsTableProps {
	readonly slots: (Slot & { registrations: Registration[] })[];
	readonly totalPages: number;
	readonly currentPage: number;
	readonly totalCount: number;
}

export default function SlotsTable({ slots, totalPages, currentPage, totalCount }: SlotsTableProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = (page: number): void => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`/admin/slot?${params.toString()}`);
	};

	return (
		<Stack gap="md">
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
										href={`/admin/slot/${slot.id}/edit`}
										variant="light"
										color="yellow"
										size="sm"
										title="Edit slot"
									>
										<IconEdit size="1rem" />
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

			{totalPages > 1 && (
				<Group justify="space-between" align="center">
					<Text size="sm" c="dimmed">
						Showing {slots.length} of {totalCount} slots
					</Text>
					<Pagination
						total={totalPages}
						value={currentPage}
						onChange={handlePageChange}
					/>
				</Group>
			)}
		</Stack>
	);
}
