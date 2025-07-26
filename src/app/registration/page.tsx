import Image from "next/image";
import { PrismaClient } from "@/prisma/generated";
import { Container, Title, Stack } from "@mantine/core";
import { FormContainer } from "@/component/FormContainer";

const prisma = new PrismaClient();

const horseImage = {
	width: 250,
	height: () => horseImage.width * horseImage.ratio,
	ratio: 250 / 214,
};

const getSlots = async () => {
	const slots = await prisma.slot.findMany({
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
				</Stack>
				<FormContainer slots={slots} />
			</Stack>
		</Container>
	);
}
