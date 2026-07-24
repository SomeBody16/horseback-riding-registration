import Image from "next/image";
import dayjs from "dayjs";
import { PrismaClient } from "@/prisma/generated";
import Link from "next/link";
import { Anchor, Container, Stack, Text, Title } from "@mantine/core";
import { FormContainer } from "@/component/FormContainer";

const prisma = new PrismaClient();

const horseImage = {
	width: 250,
	height: () => horseImage.width * horseImage.ratio,
	ratio: 250 / 214,
};

const getSlots = async () => {
	const slots = await prisma.slot.findMany({
		where: {
			date: {
				gte: dayjs().startOf("day").toDate(),
			},
		},
		include: {
			registrations: true,
		},
	});
	return slots.filter((slot) => slot.registrations.length < slot.limit);
};

export default async function RegistrationPage() {
	const slots = await getSlots();

	return (
		<Container size="lg" py="xl">
			<Stack align="center" gap="lg">
				<Stack align="center" gap="md">
					<Image
						src="/horse.png"
						alt="Horse"
						width={horseImage.width}
						height={horseImage.height()}
					/>
					<Title order={1}>Registration</Title>
					<Text size="sm" c="dimmed">
						New participant?{" "}
						<Anchor component={Link} href="/guide">
							Read the guide
						</Anchor>
					</Text>
				</Stack>
				<FormContainer slots={slots} />
			</Stack>
		</Container>
	);
}
