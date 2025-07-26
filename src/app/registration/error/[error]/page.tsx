import { Container, Title, Text, Button, Stack, Alert } from "@mantine/core";
import Link from "next/link";

interface ErrorPageProps {
	params: {
		error?: string;
	};
}

const getErrorMessage = (error?: string) => {
	switch (error) {
		case "slot-not-found":
			return {
				title: "Slot Not Found",
				message:
					"The selected time slot could not be found. Please try selecting a different slot.",
			};
		case "slot-full":
			return {
				title: "Slot is Full",
				message:
					"This time slot has reached its maximum capacity. Please select a different time slot.",
			};
		default:
			return {
				title: "Registration Failed",
				message:
					"Your registration could not be completed. Please try again or contact support.",
			};
	}
};

export default function ErrorPage({ params }: ErrorPageProps) {
	const { title, message } = getErrorMessage(params.error);

	return (
		<Container size="md" py="xl">
			<Stack align="center" gap="lg">
				<Stack gap="md" align="center">
					<Title order={2}>Registration Failed</Title>
					<Alert
						icon="✗"
						title={title}
						color="red"
						variant="light"
						style={{ width: "100%", maxWidth: 500 }}
					>
						<Text size="sm">{message}</Text>
					</Alert>
				</Stack>

				<Button component={Link} href="/registration" variant="outline">
					Return to Registration
				</Button>
			</Stack>
		</Container>
	);
}
