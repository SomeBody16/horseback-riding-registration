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
	const [email, setEmail] = useState<string>("");

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
						onEmailChange={setEmail}
						onPrev={() => setStep(0)}
						onNext={() => setStep(2)}
					/>
				</Stepper.Step>
				<Stepper.Step label="Confirm" description="Registration">
					<StepConfirm
						onPrev={() => setStep(1)}
						selectedSlot={selectedSlot!}
						email={email}
					/>
				</Stepper.Step>
			</Stepper>
		</Container>
	);
}
