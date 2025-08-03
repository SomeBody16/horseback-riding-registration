"use server";

import { PrismaClient, Registration, Slot } from "@/prisma/generated";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const errorRedirect = (error: string) => {
	return redirect(`/registration/error/${error}`);
}

const parseFormData = (formData: FormData) => {
	const firstName = formData.get("first-name") as string;
	const lastName = formData.get("last-name") as string;
	const slotId = formData.get("slot-id") as string;

	if (!firstName || !lastName || !slotId) {
		throw new Error("Missing required fields");
	}

	const slotIdNumber = parseInt(slotId, 10);
	if (isNaN(slotIdNumber)) {
		throw new Error("Invalid slot ID");
	}

	return { firstName, lastName, slotId: slotIdNumber };
}

const assertSlotExists = async (slotId: number) => {
	const slot = await prisma.slot.findUnique({
		where: { id: slotId },
		include: {
			registrations: true,
		},
	});

	if (!slot) {
		throw errorRedirect('slot-not-found')
	}

	return slot;
}

const assertSlotHasCapacity = async (slot: Slot & { registrations: Registration[] }) => {
	if (slot.registrations.length >= slot.limit) {
		throw errorRedirect('slot-full')
	}
}

export const handleRegistration = async (formData: FormData) => {
	const { firstName, lastName, slotId } = parseFormData(formData);

	const slot = await assertSlotExists(slotId);
	await assertSlotHasCapacity(slot);

	// Create the registration
	await prisma.registration.create({
		data: {
			firstName,
			lastName,
			slotId,
		},
	});

	// Redirect to success page
	redirect("/registration/success");
};
