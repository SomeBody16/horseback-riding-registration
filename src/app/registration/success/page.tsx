import { Container, Title, Text, Button, Stack, Alert } from "@mantine/core";
import Link from "next/link";

export default function SuccessPage() {
	return (
		<Container size="md" py="xl">
			<Stack align="center" gap="lg">
				<Stack gap="md" align="center">
					<Title order={2}>Thank you for registering!</Title>
					<Alert
						icon="✓"
						title="Registration Successful!"
						color="green"
						variant="light"
						style={{ width: "100%", maxWidth: 500 }}
					>
						<Text size="sm">
							Your horseback riding registration has been successfully
							submitted.
						</Text>
					</Alert>
				</Stack>

				<Button component={Link} href="/registration" variant="outline">
					Return to Registration
				</Button>
			</Stack>
		</Container>
	);
}
