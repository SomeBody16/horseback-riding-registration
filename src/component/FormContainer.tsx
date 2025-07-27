"use client";

import { useState } from "react";
import { Stepper, Container } from "@mantine/core";
import { Slot } from "@/prisma/generated";
import { StepSlots } from "./StepSlots";
import { StepForm } from "./StepForm";
import { StepConfirm } from "./StepConfirm";

export type FormContainerProps = {
	slots: Slot[];
};

export function FormContainer({ slots }: FormContainerProps) {
	const [step, setStep] = useState(0);
	const [selectedSlot, setSelectedSlot] = useState<Slot | undefined>();
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");

	return (
		<Container size="md" mt="xl">
			<Stepper active={step}>
				<Stepper.Step label="Select" description="Date and slots">
					<StepSlots
						slots={slots}
						value={selectedSlot}
						onChange={setSelectedSlot}
						onNext={() => setStep(1)}
					/>
				</Stepper.Step>
				<Stepper.Step label="Fill" description="Your information">
					<StepForm
						onFirstNameChange={setFirstName}
						onLastNameChange={setLastName}
						onPrev={() => setStep(0)}
						onNext={() => setStep(2)}
					/>
				</Stepper.Step>
				<Stepper.Step label="Confirm" description="Registration">
					<StepConfirm
						onPrev={() => setStep(1)}
						selectedSlot={selectedSlot!}
						firstName={firstName}
						lastName={lastName}
					/>
				</Stepper.Step>
			</Stepper>
		</Container>
	);
}
