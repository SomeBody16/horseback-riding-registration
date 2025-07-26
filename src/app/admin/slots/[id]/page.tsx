import { Container, Title, Card, Group, Badge, Button, Stack, Text, Divider } from '@mantine/core';
import { notFound } from 'next/navigation';
import { IconArrowLeft, IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { getSlot } from '@/action/slots';
import { format } from 'date-fns';

interface SlotDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SlotDetailsPage({ params }: SlotDetailsPageProps) {
  const { id } = await params;
  const slot = await getSlot(id);

  if (!slot) {
    notFound();
  }

  return (
    <Container size="lg">
      <Stack gap="lg">
        {/* Header */}
        <Group>
          <Button
            component={Link}
            href="/admin/slots"
            variant="light"
            leftSection={<IconArrowLeft size="1rem" />}
          >
            Back to Slots
          </Button>
        </Group>

        {/* Slot Details Card */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="lg">
            {/* Header */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Title order={1}>Slot #{slot.id}</Title>
                <Text c="dimmed" size="lg">
                  {format(slot.date, 'EEEE, MMMM do, yyyy')}
                </Text>
              </div>
              <Badge variant="light" color="blue" size="lg">
                {slot.type}
              </Badge>
            </Group>

            <Divider />

            {/* Details Grid */}
            <Stack gap="md">
              <Group>
                <Text fw={500} w={120}>Date:</Text>
                <Text>{format(slot.date, 'dd/MM/yyyy')}</Text>
              </Group>

              <Group>
                <Text fw={500} w={120}>Time:</Text>
                <Text>{slot.startTime} - {slot.endTime}</Text>
              </Group>

              <Group>
                <Text fw={500} w={120}>Type:</Text>
                <Text>{slot.type}</Text>
              </Group>

              <Group>
                <Text fw={500} w={120}>Limit:</Text>
                <Text>{slot.limit} participants</Text>
              </Group>

              <Group>
                <Text fw={500} w={120}>Registrations:</Text>
                <Badge 
                  variant="light" 
                  color={slot.registrations.length >= slot.limit ? "red" : "green"}
                  size="md"
                >
                  {slot.registrations.length}/{slot.limit}
                </Badge>
              </Group>

              <Group>
                <Text fw={500} w={120}>Status:</Text>
                <Badge 
                  variant="light" 
                  color={slot.registrations.length >= slot.limit ? "red" : "green"}
                >
                  {slot.registrations.length >= slot.limit ? "Full" : "Available"}
                </Badge>
              </Group>
            </Stack>

            {/* Registrations List */}
            {slot.registrations.length > 0 && (
              <>
                <Divider />
                <div>
                  <Title order={3} mb="md">Registrations</Title>
                  <Stack gap="xs">
                    {slot.registrations.map((registration) => (
                      <Card key={registration.id} shadow="xs" padding="sm" radius="sm" withBorder>
                        <Text>{registration.email}</Text>
                      </Card>
                    ))}
                  </Stack>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <Divider />
            <Group justify="flex-end" gap="md">
              <Button
                component={Link}
                href={`/admin/slots/${id}/update`}
                leftSection={<IconEdit size="1rem" />}
                variant="light"
                color="yellow"
              >
                Edit Slot
              </Button>
              <Button
                component={Link}
                href={`/admin/slots/${id}/delete`}
                leftSection={<IconTrash size="1rem" />}
                variant="light"
                color="red"
              >
                Delete Slot
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}