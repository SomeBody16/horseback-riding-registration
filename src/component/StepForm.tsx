import { useEffect } from "react";
import {
  Fieldset,
  Button,
  Stack,
  TextInput,
  Group,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

/**
 * Check if the email is valid and contains @cisco.com
 */
const isEmailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.endsWith("@cisco.com");
};

export type StepFormProps = {
  onEmailChange: (email: string) => void;
  onPrev: () => void;
  onNext: () => void;
};

export function StepForm({ onEmailChange, onPrev, onNext }: StepFormProps) {
  const [email, setEmail] = useLocalStorage({
    key: "cisco-email",
    defaultValue: "",
  });

  useEffect(() => {
    onEmailChange(email || "");
  }, [email, onEmailChange]);

  const emailError = email && !isEmailValid(email) 
    ? "Invalid email address" 
    : undefined;

  return (
    <Fieldset>
      <Stack gap="xl">
        <TextInput
          label="E-mail address"
          description="Please enter your Cisco E-mail"
          required
          placeholder="example@cisco.com"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
        <Group justify="space-between">
          <Button variant="outline" onClick={onPrev}>
            Back
          </Button>
          <Button onClick={onNext} disabled={!email}>
            Next
          </Button>
        </Group>
      </Stack>
    </Fieldset>
  );
}
