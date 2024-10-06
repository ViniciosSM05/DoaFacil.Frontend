import type { NotificationState, NotificationType } from '@/types/notification/NotificationState'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORE_NAME = 'notification'
export const useNotificationStore = defineStore(STORE_NAME, () => {
  const state = ref<NotificationState>({
    type: 'primary',
    message: '',
    visible: false,
    timeoutInSeconds: 3
  })

  const showNotification = (message: string, type: NotificationType = 'primary') =>
    (state.value = {
      ...state.value,
      message,
      type,
      visible: true
    })

  const showNotificationSuccess = (message: string) => showNotification(message, 'primary')

  const showNotificationError = (message: string) => showNotification(message, 'danger')

  return {
    state,
    showNotification,
    showNotificationSuccess,
    showNotificationError
  }
})
