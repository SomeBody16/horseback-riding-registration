import { Container, Title, Text, SimpleGrid, Card, Group, Stack, Skeleton } from '@mantine/core';
import { IconUsers, IconCalendarTime, IconCheck, IconAlertCircle } from '@tabler/icons-react';

export default function AdminDashboard() {
  return (
    <Container size="xl">
      <Stack gap="xl">
        {/* Welcome Section */}
        <div>
          <Title order={1} mb="xs">Welcome to Admin Dashboard</Title>
          <Text c="dimmed" size="lg">
            Manage your horseback riding slots and monitor registrations
          </Text>
        </div>

        {/* Statistics Cards */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <IconUsers size="2rem" color="var(--mantine-color-blue-6)" />
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Total Slots
                </Text>
                <Skeleton height={24} width={60} />
              </div>
            </Group>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <IconCalendarTime size="2rem" color="var(--mantine-color-green-6)" />
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Upcoming Slots
                </Text>
                <Skeleton height={24} width={60} />
              </div>
            </Group>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <IconCheck size="2rem" color="var(--mantine-color-teal-6)" />
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Total Registrations
                </Text>
                <Skeleton height={24} width={60} />
              </div>
            </Group>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <IconAlertCircle size="2rem" color="var(--mantine-color-orange-6)" />
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Available Slots
                </Text>
                <Skeleton height={24} width={60} />
              </div>
            </Group>
          </Card>
        </SimpleGrid>

        {/* Quick Actions */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">Quick Actions</Title>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            <Card shadow="xs" padding="md" radius="sm" withBorder>
              <Text fw={500} mb="xs">Create New Slot</Text>
              <Text size="sm" c="dimmed" mb="md">
                Add a new horseback riding session
              </Text>
              <Skeleton height={32} width={100} />
            </Card>

            <Card shadow="xs" padding="md" radius="sm" withBorder>
              <Text fw={500} mb="xs">View All Slots</Text>
              <Text size="sm" c="dimmed" mb="md">
                Manage existing slots and registrations
              </Text>
              <Skeleton height={32} width={100} />
            </Card>

            <Card shadow="xs" padding="md" radius="sm" withBorder>
              <Text fw={500} mb="xs">Export Data</Text>
              <Text size="sm" c="dimmed" mb="md">
                Download registration reports
              </Text>
              <Skeleton height={32} width={100} />
            </Card>
          </SimpleGrid>
        </Card>

        {/* Recent Activity */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">Recent Activity</Title>
          <Stack gap="md">
            {[1, 2, 3].map((i) => (
              <Group key={i} justify="space-between">
                <div>
                  <Skeleton height={16} width={200} mb={4} />
                  <Skeleton height={12} width={150} />
                </div>
                <Skeleton height={12} width={80} />
              </Group>
            ))}
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}