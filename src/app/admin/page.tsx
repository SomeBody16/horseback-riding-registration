import { Container, Title, Text, SimpleGrid, Card, Group, Stack, Badge } from '@mantine/core';
import { IconCalendarTime } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { getDashboardStats } from '@/action/slots';
import DashboardDateFilter from './DashboardDateFilter';
import ParticipantStatsCards from './ParticipantStatsCards';

interface AdminDashboardProps {
  readonly searchParams: Promise<{ from?: string; to?: string }>;
}

function formatVisitLabel(visitNumber: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const remainder = visitNumber % 100;
  const suffix = suffixes[(remainder - 20) % 10] ?? suffixes[remainder] ?? suffixes[0];
  return `${visitNumber}${suffix} time`;
}

export default async function AdminDashboard({ searchParams }: AdminDashboardProps) {
  const { from, to } = await searchParams;
  const fromDate = from ? dayjs(from).startOf('day') : null;
  const toDate = to ? dayjs(to).endOf('day') : null;

  const { participantCount, uniqueParticipantCount, totalSlots, participants, recentActivity } =
    await getDashboardStats({
      from: fromDate?.toDate(),
      to: toDate?.toDate(),
    });

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="flex-end">
          <DashboardDateFilter from={from ?? null} to={to ?? null} />
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
          <ParticipantStatsCards
            participantCount={participantCount}
            uniqueParticipantCount={uniqueParticipantCount}
            participants={participants}
          />
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <IconCalendarTime size="2rem" color="var(--mantine-color-green-6)" />
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Total Slots
                </Text>
                <Text size="xl" fw={700}>
                  {totalSlots}
                </Text>
              </div>
            </Group>
          </Card>
        </SimpleGrid>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">Recent Activity</Title>
          {recentActivity.length === 0 ? (
            <Text c="dimmed" size="sm">No registrations in this range.</Text>
          ) : (
            <Stack gap="md">
              {recentActivity.map((activity) => (
                <Group key={activity.id} justify="space-between" wrap="nowrap">
                  <div>
                    <Group gap="xs">
                      <Text fw={500}>
                        {activity.firstName} {activity.lastName}
                      </Text>
                      <Badge
                        variant={activity.visitNumber === 1 ? 'filled' : 'light'}
                        color={activity.visitNumber === 1 ? 'yellow' : 'gray'}
                        size="sm"
                      >
                        {formatVisitLabel(activity.visitNumber)}
                      </Badge>
                    </Group>
                    <Text size="sm" c="dimmed">
                      Registered for {activity.slotType}
                    </Text>
                  </div>
                  <Text size="xs" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
                    {dayjs(activity.slotDate).format('MMM D, YYYY')}
                  </Text>
                </Group>
              ))}
            </Stack>
          )}
        </Card>
      </Stack>
    </Container>
  );
}
