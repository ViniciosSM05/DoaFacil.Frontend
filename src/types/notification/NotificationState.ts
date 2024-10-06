export interface NotificationState {
  visible: boolean
  message: string
  type: NotificationType
  timeoutInSeconds: number
}

export type NotificationType = 'primary' | 'danger'
