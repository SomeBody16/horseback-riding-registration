import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding 20 test slots...");

  const slotTypes = ["Beginner", "Group"];
  const timeSlots = [
    { start: "09:00", end: "10:00" },
    { start: "10:30", end: "11:30" },
    { start: "14:00", end: "15:00" },
    { start: "15:30", end: "16:30" },
    { start: "17:00", end: "18:00" },
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const slots = [];

  for (let i = 0; i < 20; i++) {
    // Spread slots over next 14 days
    const daysFromNow = Math.floor(i / 2) + 1;
    const date = new Date(today);
    date.setDate(date.getDate() + daysFromNow);

    const timeSlot = timeSlots[i % timeSlots.length];
    const type = slotTypes[i % slotTypes.length];
    const limit = type === "Beginner" ? 4 : 8;

    slots.push({
      date,
      startTime: timeSlot.start,
      endTime: timeSlot.end,
      type,
      limit,
    });
  }

  const result = await prisma.slot.createMany({
    data: slots,
  });

  console.log(`Created ${result.count} test slots!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
