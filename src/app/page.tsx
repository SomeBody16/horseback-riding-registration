import Image from "next/image";
import { PrismaClient } from "@/prisma/generated";
import { Title } from "@mantine/core";
import { StepSlotsDate } from "@/component/StepSlots.date";
import { FormContainer } from "@/component/FormContainer";

const prisma = new PrismaClient();

const horseImage = {
	width: 250,
	height: () => horseImage.width * horseImage.ratio,
	ratio: 250 / 214,
};

export default async function RegistrationPage() {
	const slots = await prisma.slot.findMany();

	return (
		<div className="flex flex-col items-center pt-4 min-h-screen">
			<div className="flex flex-col justify-center items-center gap-4">
				<div>
					<Image
						src="/horse.png"
						alt="Horse"
						width={horseImage.width}
						height={horseImage.height()}
					/>
				</div>
				<Title order={1}>Registration</Title>
			</div>
			<FormContainer slots={slots} />
		</div>
	);
}
