import { useEffect, useMemo, useState } from "react";
import { Slot } from "@/prisma/generated";
import { Group, Radio, ScrollArea, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";

export type StepSlotsTimeProps = {
  slots: Slot[];
  selectedDate: Date;
  onChange: (value: Slot | undefined) => void;
};

export function StepSlotsTime({
  slots,
  selectedDate,
  onChange,
}: StepSlotsTimeProps) {
  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    return slots.filter((slot) => 
      dayjs(slot.date).isSame(selectedDate, "day")
    );
  }, [selectedDate, slots]);

  const [value, setValue] = useState<string | undefined>();

  useEffect(() => {
    const slot = slots.find((slot) => slot.id.toString() === value);
    onChange(slot);
  }, [value, slots, onChange]);

  return (
    <Radio.Group value={value} onChange={setValue}>
      <ScrollArea h={250}>
        <Stack gap="xs" pt="xs">
          {availableSlots.map((slot) => (
            <Radio.Card
              key={slot.id}
              radius="md"
              value={slot.id.toString()}
            >
              <Group
                wrap="nowrap"
                align="flex-start"
                gap="xs"
                p="xs"
              >
                <Radio.Indicator />
                <div>
                  <Text size="sm" fw={700}>
                    {slot.startTime} - {slot.endTime}
                  </Text>
                  <Text c="gray.6">{slot.type}</Text>
                </div>
              </Group>
            </Radio.Card>
          ))}
        </Stack>
      </ScrollArea>
    </Radio.Group>
  );
}
