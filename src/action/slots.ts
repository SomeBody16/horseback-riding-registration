"use server";

import { PrismaClient } from "@/prisma/generated";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// Error handling helper
const errorRedirect = (error: string) => {
  return redirect(`/admin/error/${error}`);
};

// Form data parsing helper
const parseSlotFormData = (formData: FormData) => {
  const date = formData.get("date") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const type = formData.get("type") as string;
  const limit = parseInt(formData.get("limit") as string, 10);
  const description = formData.get("description") as string;

  if (!date || !startTime || !endTime || !type || isNaN(limit)) {
    throw new Error("Missing required fields");
  }

  if (limit <= 0) {
    throw new Error("Limit must be a positive number");
  }

  // Validate time logic
  if (startTime >= endTime) {
    throw new Error("End time must be after start time");
  }

  return { date, startTime, endTime, type, limit, description };
};

export const createSlot = async (formData: FormData) => {
  try {
    const slotData = parseSlotFormData(formData);
    
    await prisma.slot.create({
      data: {
        date: new Date(slotData.date),
        startTime: slotData.startTime,
        endTime: slotData.endTime,
        type: slotData.type,
        limit: slotData.limit,
      },
    });

    redirect("/admin/slots?success=created");
  } catch (error) {
    console.error("Error creating slot:", error);
    errorRedirect("invalid-data");
  }
};

export const updateSlot = async (id: string, formData: FormData) => {
  try {
    const slotId = parseInt(id, 10);
    if (isNaN(slotId)) {
      throw new Error("Invalid slot ID");
    }

    const slotData = parseSlotFormData(formData);
    
    await prisma.slot.update({
      where: { id: slotId },
      data: {
        date: new Date(slotData.date),
        startTime: slotData.startTime,
        endTime: slotData.endTime,
        type: slotData.type,
        limit: slotData.limit,
      },
    });

    redirect(`/admin/slots/${id}?success=updated`);
  } catch (error) {
    console.error("Error updating slot:", error);
    errorRedirect("invalid-data");
  }
};

export const deleteSlot = async (id: string) => {
  try {
    const slotId = parseInt(id, 10);
    if (isNaN(slotId)) {
      throw new Error("Invalid slot ID");
    }

    // Check if slot has registrations
    const slot = await prisma.slot.findUnique({
      where: { id: slotId },
      include: { registrations: true },
    });

    if (!slot) {
      errorRedirect("not-found");
    }

    if (slot.registrations.length > 0) {
      errorRedirect("slot-has-registrations");
    }

    await prisma.slot.delete({
      where: { id: slotId },
    });

    redirect("/admin/slots?success=deleted");
  } catch (error) {
    console.error("Error deleting slot:", error);
    errorRedirect("server-error");
  }
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