import { useActionState, useEffect } from "react"
import { notifications, NotificationData } from "@mantine/notifications"
import { NotificationActionState } from "@/lib/NotificationAction"

export function useNotificationAction<
	State extends NotificationActionState<unknown> | undefined,
	TAction extends (state: Awaited<State> | undefined, formData: FormData) => State | Promise<State>
>(action: TAction): [State, (formData: FormData) => void, boolean] {
	const [state, formAction, pending] = useActionState(action, undefined as Awaited<State>)
	useEffect(() => {
		if (state && typeof state === 'object' && 'notify' in state) {
			notifications.show(state.notify as NotificationData)
		}
	})

	return [state, formAction, pending]
}
