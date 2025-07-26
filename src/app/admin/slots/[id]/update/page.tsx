'use client';

import { Container, Title, Card, NumberInput, Select, Textarea, Button, Group, Stack } from '@mantine/core';
import { notFound } from 'next/navigation';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { updateSlot, getSlot } from '@/action/slots';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

const slotTypes = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'private', label: 'Private Lesson' },
  { value: 'group', label: 'Group Lesson' },
];

interface UpdateSlotPageProps {
  params: {
    id: string;
  };
}

export default function UpdateSlotPage({ params }: UpdateSlotPageProps) {
  const [loading, setLoading] = useState(true);
  const [slot, setSlot] = useState<unknown>(null);

  const form = useForm({
    initialValues: {
      date: new Date(),
      startTime: '',
      endTime: '',
      type: '',
      limit: 1,
      description: '',
    },
    validate: {
      date: (value) => (!value ? 'Date is required' : null),
      startTime: (value) => (!value ? 'Start time is required' : null),
      endTime: (value) => (!value ? 'End time is required' : null),
      type: (value) => (!value ? 'Type is required' : null),
      limit: (value) => (value < 1 ? 'Limit must be at least 1' : null),
    },
  });

  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const slotData = await getSlot(params.id);
        if (!slotData) {
          notFound();
        }
        
        setSlot(slotData);
        form.setValues({
          date: new Date(slotData.date),
          startTime: slotData.startTime,
          endTime: slotData.endTime,
          type: slotData.type,
          limit: slotData.limit,
          description: slotData.description || '',
        });
      } catch (error) {
        console.error('Error fetching slot:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchSlot();
  }, [params.id, form]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const formData = new FormData();
      formData.append('date', values.date.toISOString().split('T')[0]);
      formData.append('startTime', values.startTime);
      formData.append('endTime', values.endTime);
      formData.append('type', values.type);
      formData.append('limit', values.limit.toString());
      formData.append('description', values.description);

      await updateSlot(params.id, formData);
      
      notifications.show({
        title: 'Success',
        message: 'Slot updated successfully',
        color: 'green',
      });
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to update slot',
        color: 'red',
      });
    }
  };

  if (loading) {
    return (
      <Container size="md">
        <Stack gap="lg">
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
          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Title order={1}>Loading...</Title>
          </Card>
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="md">
      <Stack gap="lg">
        {/* Header */}
        <Group>
          <Button
            component={Link}
            href={`/admin/slots/${params.id}`}
            variant="light"
            leftSection={<IconArrowLeft size="1rem" />}
          >
            Back to Slot Details
          </Button>
        </Group>

        {/* Form Card */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="lg">
            <Title order={1}>Edit Slot #{params.id}</Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <DatePickerInput
                  label="Date"
                  placeholder="Pick a date"
                  value={form.values.date}
                  onChange={(value) => form.setFieldValue('date', value || new Date())}
                  error={form.errors.date}
                  required
                />

                <Group grow>
                  <TimeInput
                    label="Start Time"
                    placeholder="Start time"
                    value={form.values.startTime}
                    onChange={(event) => form.setFieldValue('startTime', event.currentTarget.value)}
                    error={form.errors.startTime}
                    required
                  />
                  <TimeInput
                    label="End Time"
                    placeholder="End time"
                    value={form.values.endTime}
                    onChange={(event) => form.setFieldValue('endTime', event.currentTarget.value)}
                    error={form.errors.endTime}
                    required
                  />
                </Group>

                <Select
                  label="Type"
                  placeholder="Select slot type"
                  data={slotTypes}
                  value={form.values.type}
                  onChange={(value) => form.setFieldValue('type', value || '')}
                  error={form.errors.type}
                  required
                />

                <NumberInput
                  label="Participant Limit"
                  placeholder="Maximum number of participants"
                  value={form.values.limit}
                  onChange={(value) => form.setFieldValue('limit', value || 1)}
                  error={form.errors.limit}
                  min={1}
                  required
                />

                <Textarea
                  label="Description (Optional)"
                  placeholder="Additional details about this slot"
                  value={form.values.description}
                  onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
                  rows={3}
                />

                <Group justify="flex-end" gap="md" mt="md">
                  <Button
                    component={Link}
                    href={`/admin/slots/${params.id}`}
                    variant="light"
                    color="gray"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="blue">
                    Update Slot
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