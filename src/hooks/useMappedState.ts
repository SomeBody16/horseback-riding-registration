import { useState } from "react";

export type UseMappedStateResult<TMapped, TRaw> = [
	value: TMapped | undefined,
	setValue: (value: TRaw | undefined | null) => void
]

export function useMappedState<TMapped, TRaw>(
	defaultValue: TRaw | undefined,
	mapper: (value: TRaw) => TMapped
): UseMappedStateResult<TMapped, TRaw> {
	const [value, setMappedValue] = useState<TMapped | undefined>(defaultValue ? mapper(defaultValue) : undefined);

	const setValue = (value: TRaw | undefined | null) => {
		if (!!value) {
			setMappedValue(mapper(value));
		} else {
			setMappedValue(undefined);
		}
	}

	return [value, setValue]
};
