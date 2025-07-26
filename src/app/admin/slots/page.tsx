import { Container, Title, Button, Table, Group, Badge, ActionIcon, Stack } from '@mantine/core';
import { IconPlus, IconEye, IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { getSlots } from '@/action/slots';
import { format } from 'date-fns';

export default async function SlotsManagementPage() {
  const slots = await getSlots();

  return (
    <Container size="xl">
      <Stack gap="lg">
        {/* Page Header */}
        <Group justify="space-between" align="center">
          <Title order={1}>Manage Slots</Title>
          <Button
            component={Link}
            href="/admin/slots/create"
            leftSection={<IconPlus size="1rem" />}
            size="md"
          >
            Create Slot
          </Button>
        </Group>

        {/* Slots Table */}
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Time</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Limit</Table.Th>
              <Table.Th>Registrations</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {slots.map((slot) => (
              <Table.Tr key={slot.id}>
                <Table.Td>{slot.id}</Table.Td>
                <Table.Td>{format(slot.date, 'dd/MM/yyyy')}</Table.Td>
                <Table.Td>{slot.startTime} - {slot.endTime}</Table.Td>
                <Table.Td>
                  <Badge variant="light" color="blue">
                    {slot.type}
                  </Badge>
                </Table.Td>
                <Table.Td>{slot.limit}</Table.Td>
                <Table.Td>
                  <Badge 
                    variant="light" 
                    color={slot.registrations.length >= slot.limit ? "red" : "green"}
                  >
                    {slot.registrations.length}/{slot.limit}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      component={Link}
                      href={`/admin/slots/${slot.id}`}
                      variant="light"
                      color="blue"
                      size="sm"
                      title="View details"
                    >
                      <IconEye size="1rem" />
                    </ActionIcon>
                    <ActionIcon
                      component={Link}
                      href={`/admin/slots/${slot.id}/update`}
                      variant="light"
                      color="yellow"
                      size="sm"
                      title="Edit slot"
                    >
                      <IconEdit size="1rem" />
                    </ActionIcon>
                    <ActionIcon
                      component={Link}
                      href={`/admin/slots/${slot.id}/delete`}
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
      </Stack>
    </Container>
  );
}