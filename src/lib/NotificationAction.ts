import { NotificationData } from "@mantine/notifications"

export type NotificationActionState<T> = T & { notify: NotificationData }
export type NotificationActionFn<T> = (state: NotificationActionState<T>, formData: FormData) => Promise<NotificationActionState<T> | undefined>

export class NotificationActionError extends Error {
	constructor(readonly notification: NotificationData) {
		super(notification.title as string)
	}
}

export class NotificationAction {

	static create = <T>(action: NotificationActionFn<T>) => {
		return async (state: NotificationActionState<T> | undefined, formData: FormData) => {
			try {
				return await action(state || {} as NotificationActionState<T>, formData)
			} catch (error) {
				if (error instanceof NotificationActionError) {
					return {
						...state,
						notify: error.notification
					}
				}

				throw error
			}
		}
	}

	static error = (notification: NotificationData) => {
		return new NotificationActionError(notification)
	}

}
