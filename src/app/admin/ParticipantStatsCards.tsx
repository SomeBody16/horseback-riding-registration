"use client";

import { Card, Group, Text, Button, Modal, Stack, ScrollArea, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUsers, IconUserCheck, IconList } from "@tabler/icons-react";
import { ParticipantSummary } from "@/action/slots";

export interface ParticipantStatsCardsProps {
	readonly participantCount: number;
	readonly uniqueParticipantCount: number;
	readonly participants: readonly ParticipantSummary[];
}

export default function ParticipantStatsCards({
	participantCount,
	uniqueParticipantCount,
	participants,
}: ParticipantStatsCardsProps) {
	const [allOpened, all] = useDisclosure(false);
	const [uniqueOpened, unique] = useDisclosure(false);

	const uniqueSorted = [...participants].sort(
		(a, b) =>
			a.firstName.localeCompare(b.firstName) || a.lastName.localeCompare(b.lastName)
	);

	return (
		<>
			<Card shadow="sm" padding="lg" radius="md" withBorder>
				<Group justify="space-between" align="flex-start">
					<Group>
						<IconUsers size="2rem" color="var(--mantine-color-blue-6)" />
						<div>
							<Text size="xs" c="dimmed" tt="uppercase" fw={700}>
								Participants
							</Text>
							<Text size="xl" fw={700}>
								{participantCount}
							</Text>
						</div>
					</Group>
					<Button
						size="xs"
						variant="light"
						leftSection={<IconList size="1rem" />}
						onClick={all.open}
						disabled={participants.length === 0}
					>
						View
					</Button>
				</Group>
			</Card>

			<Card shadow="sm" padding="lg" radius="md" withBorder>
				<Group justify="space-between" align="flex-start">
					<Group>
						<IconUserCheck size="2rem" color="var(--mantine-color-teal-6)" />
						<div>
							<Text size="xs" c="dimmed" tt="uppercase" fw={700}>
								Unique Participants
							</Text>
							<Text size="xl" fw={700}>
								{uniqueParticipantCount}
							</Text>
						</div>
					</Group>
					<Button
						size="xs"
						variant="light"
						color="teal"
						leftSection={<IconList size="1rem" />}
						onClick={unique.open}
						disabled={participants.length === 0}
					>
						View
					</Button>
				</Group>
			</Card>

			<Modal opened={allOpened} onClose={all.close} title="Participants" scrollAreaComponent={ScrollArea.Autosize}>
				<Stack gap="xs">
					{participants.map((participant) => (
						<Group key={`${participant.firstName}-${participant.lastName}`} justify="space-between">
							<Text>
								{participant.firstName} {participant.lastName}
							</Text>
							<Badge variant="light" color="blue">
								x{participant.count}
							</Badge>
						</Group>
					))}
				</Stack>
			</Modal>

			<Modal opened={uniqueOpened} onClose={unique.close} title="Unique Participants" scrollAreaComponent={ScrollArea.Autosize}>
				<Stack gap="xs">
					{uniqueSorted.map((participant) => (
						<Text key={`${participant.firstName}-${participant.lastName}`}>
							{participant.firstName} {participant.lastName}
						</Text>
					))}
				</Stack>
			</Modal>
		</>
	);
}
