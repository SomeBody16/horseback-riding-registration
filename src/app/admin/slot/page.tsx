import { Container, Title, Button, Group, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { getSlots } from "@/action/slots";
import SlotsTable from "@/app/admin/slot/SlotsTable";

interface SlotsManagementPageProps {
	searchParams: Promise<{ page?: string }>;
}

export default async function SlotsManagementPage({ searchParams }: SlotsManagementPageProps) {
	const params = await searchParams;
	const page = Math.max(1, parseInt(params.page || "1", 10));
	const { slots, totalPages, currentPage, totalCount } = await getSlots(page);

	return (
		<Container size="xl">
			<Stack gap="lg">
				{/* Page Header */}
				<Group justify="space-between" align="center">
					<Title order={1}>Manage Slots</Title>
					<Button
						component={Link}
						href="/admin/slot/create"
						leftSection={<IconPlus size="1rem" />}
						size="md"
					>
						Create Slot
					</Button>
				</Group>

				{/* Slots Table */}
				<SlotsTable
					slots={slots}
					totalPages={totalPages}
					currentPage={currentPage}
					totalCount={totalCount}
				/>
			</Stack>
		</Container>
	);
}
