import { useEffect, useState } from "react";
import { Slot } from "@/prisma/generated";
import { Fieldset, Button, Group, Grid } from "@mantine/core";
import { StepSlotsDate } from "./StepSlots.date";
import { StepSlotsTime } from "./StepSlots.time";

export type StepSlotsProps = {
  slots: Slot[];
  onChange: (slots: Slot | undefined) => void;
  onNext: () => void;
};

export function StepSlots({ slots, onChange, onNext }: StepSlotsProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | undefined>();

  useEffect(() => {
    onChange(selectedSlot);
  }, [selectedSlot, onChange]);

  return (
    <Fieldset>
      <Grid gutter="lg">
        <Grid.Col span={6}>
          <StepSlotsDate slots={slots} onChange={setSelectedDate} />
        </Grid.Col>
        <Grid.Col span={6}>
          {selectedDate !== null && (
            <StepSlotsTime
              slots={slots}
              selectedDate={selectedDate}
              onChange={setSelectedSlot}
            />
          )}
        </Grid.Col>
      </Grid>
      <Group justify="flex-end" mt="lg">
        <Button
          onClick={onNext}
          disabled={selectedSlot === undefined}
        >
          Next
        </Button>
      </Group>
    </Fieldset>
  );
}
