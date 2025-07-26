import { Container, Button, Card, Alert, Stack, Group } from '@mantine/core';
import { IconAlertTriangle, IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

interface AdminErrorPageProps {
  params: Promise<{
    error: string;
  }>;
}

const errorMessages = {
  'invalid-data': {
    title: 'Invalid Data',
    message: 'The provided data is invalid or missing required fields. Please check your input and try again.',
    color: 'orange' as const,
  },
  'not-found': {
    title: 'Not Found',
    message: 'The requested resource could not be found. It may have been deleted or moved.',
    color: 'blue' as const,
  },
  'unauthorized': {
    title: 'Unauthorized',
    message: 'You do not have permission to perform this action. Please contact an administrator.',
    color: 'red' as const,
  },
  'server-error': {
    title: 'Server Error',
    message: 'An unexpected error occurred on the server. Please try again later.',
    color: 'red' as const,
  },
  'slot-has-registrations': {
    title: 'Cannot Delete Slot',
    message: 'This slot cannot be deleted because it has active registrations. Please remove all registrations first.',
    color: 'orange' as const,
  },
};

export default async function AdminErrorPage({ params }: AdminErrorPageProps) {
  const { error } = await params;
  const errorConfig = errorMessages[error as keyof typeof errorMessages] || {
    title: 'Unknown Error',
    message: 'An unknown error occurred. Please try again.',
    color: 'gray' as const,
  };

  return (
    <Container size="md">
      <Stack gap="lg" align="center" justify="center" style={{ minHeight: '60vh' }}>
        <Card shadow="sm" padding="xl" radius="md" withBorder style={{ maxWidth: 500 }}>
          <Stack gap="lg" align="center">
            <Alert 
              icon={<IconAlertTriangle size="1rem" />} 
              title={errorConfig.title} 
              color={errorConfig.color}
              variant="light"
              style={{ width: '100%' }}
            >
              {errorConfig.message}
            </Alert>

            <Group>
              <Button
                component={Link}
                href="/admin"
                variant="light"
                leftSection={<IconArrowLeft size="1rem" />}
              >
                Back to Dashboard
              </Button>
              <Button
                component={Link}
                href="/admin/slots"
                variant="light"
                color="blue"
              >
                View Slots
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}