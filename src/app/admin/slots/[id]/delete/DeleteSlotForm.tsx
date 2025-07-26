'use client';

import { Button, Group, TextInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { deleteSlot } from '@/action/slots';
import { useRouter } from 'next/navigation';

interface DeleteSlotFormProps {
  slotId: string;
}

export default function DeleteSlotForm({ slotId }: DeleteSlotFormProps) {
  const router = useRouter();
  
  const form = useForm({
    initialValues: {
      confirmation: '',
    },
    validate: {
      confirmation: (value) => 
        value !== 'DELETE' ? 'Please type DELETE to confirm' : null,
    },
  });

  const handleSubmit = async () => {
    try {
      await deleteSlot(slotId);
      
      notifications.show({
        title: 'Success',
        message: 'Slot deleted successfully',
        color: 'green',
      });
      
      router.push('/admin/slots');
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete slot',
        color: 'red',
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Type 'DELETE' to confirm"
          placeholder="DELETE"
          value={form.values.confirmation}
          onChange={(event) => form.setFieldValue('confirmation', event.currentTarget.value)}
          error={form.errors.confirmation}
          required
        />

        <Group justify="flex-end" gap="md">
          <Button
            component="a"
            href={`/admin/slots/${slotId}`}
            variant="light"
            color="gray"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            color="red"
            disabled={form.values.confirmation !== 'DELETE'}
          >
            Confirm Delete
          </Button>
        </Group>
      </Stack>
    </form>
  );
}