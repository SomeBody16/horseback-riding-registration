"use client";

import { Slot } from "@/prisma/generated";
import { useState } from "react";
import { Stepper } from "@mantine/core";
import { StepSlots } from "./StepSlots";
import { StepForm } from "./StepForm";
import { StepConfirm } from "./StepConfirm";

export type FormContainerProps = {
	slots: Slot[];
};

export function FormContainer({ slots }: FormContainerProps) {
	const [step, setStep] = useState(0);

	const [selectedSlot, setSelectedSlot] = useState<Slot>();
	const [email, setEmail] = useState<string>("");

	return (
		<>
			<Stepper active={step} className="mt-12 w-2xl">
				<Stepper.Step
					label="Select"
					description="Date and slots"
					className="flex justify-center"
				>
					<StepSlots
						slots={slots}
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
						onNext={() => {}}
						selectedSlot={selectedSlot!}
						email={email}
					/>
				</Stepper.Step>
			</Stepper>
		</>
	);
}
