"use client";

import { useEffect, useState } from "react";
import { Slot } from "@/prisma/generated";
import { Indicator } from "@mantine/core";
import { DatePicker, DatePickerProps } from "@mantine/dates";
import dayjs from "dayjs";

const getDayProps =
  (slots: Slot[]): DatePickerProps["getDayProps"] =>
  (date) => {
    const isSlotAvailable = slots.some((slot) =>
      dayjs(slot.date).isSame(date, "day")
    );

    return { disabled: !isSlotAvailable };
  };

const renderDay =
  (slots: Slot[]): DatePickerProps["renderDay"] =>
  (date) => {
    const day = dayjs(date).date();
    const availableSlotsCount = slots.filter((slot) =>
      dayjs(slot.date).isSame(date, "day")
    ).length;

    return (
      <Indicator
        size={16}
        label={availableSlotsCount}
        processing
        color="green"
        offset={-7}
        disabled={availableSlotsCount === 0}
      >
        <div>{day}</div>
      </Indicator>
    );
  };

export type StepSlotsDateProps = {
  slots: Slot[];
  onChange: (date: Date | null) => void;
};

export function StepSlotsDate({ slots, onChange }: StepSlotsDateProps) {
  const today = new Date();
  const firstAvailableDate = dayjs(slots[0]?.date).toDate();

  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      onChange(dayjs(value).toDate());
    } else {
      onChange(null);
    }
  }, [value, onChange]);

  return (
    <DatePicker
      value={value}
      onChange={setValue}
      getDayProps={getDayProps(slots)}
      defaultDate={firstAvailableDate}
      minDate={today}
      maxLevel="month"
      firstDayOfWeek={1}
      renderDay={renderDay(slots)}
    />
  );
}
