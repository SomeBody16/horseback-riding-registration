"use server";

import { NotificationAction } from "@/lib/NotificationAction";
import { PrismaClient } from "@/prisma/generated";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const parseSlotFormData = (formData: FormData) => {
	const date = dayjs(formData.get("date") as string).toDate();
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const type = formData.get("type") as string;
	const limit = parseInt(formData.get("limit") as string, 10);

  if (!date || !startTime || !endTime || !type || isNaN(limit)) {
		throw NotificationAction.error({
			title: "Missing required fields",
			message: "Please fill in all required fields",
			color: "red",
		})
  }

	return { date, startTime, endTime, type, limit };
};

export const createSlot = NotificationAction.create(async (_, formData) => {
	const data = parseSlotFormData(formData)
	const slot = await prisma.slot.create({ data })

	redirect(`/admin/slot/${slot.id}`)
})

export const deleteSlot = async (formData: FormData) => {
	const slotId = parseInt(formData.get("slotId") as string, 10);
	if (isNaN(slotId)) {
		throw new Error("Invalid slot ID");
	}

	await prisma.registration.deleteMany({
		where: { slotId },
	})

	await prisma.slot.delete({
		where: { id: slotId },
	});

	redirect("/admin/slot");
};

export const getSlots = async () => {
  try {
    const slots = await prisma.slot.findMany({
      include: {
        registrations: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    return slots;
  } catch (error) {
    console.error("Error fetching slots:", error);
    throw new Error("Failed to fetch slots");
  }
};

export const getSlot = async (id: string) => {
  try {
    const slotId = parseInt(id, 10);
    if (isNaN(slotId)) {
      return null;
    }

    const slot = await prisma.slot.findUnique({
      where: { id: slotId },
      include: {
        registrations: true,
      },
    });

    return slot;
  } catch (error) {
    console.error("Error fetching slot:", error);
    return null;
  }
};
