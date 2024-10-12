import type { UserAuthInfo } from '@/features/login/types/AuthInfo'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const LOCAL_STORAGE_TOKEN_KEY = 'token'
const LOCAL_STORAGE_USER_KEY = 'user'
const LOCAL_STORAGE_DATA_E_HORA_DE_EXPIRACAO_KEY = 'dataEHoraDeExpiracao'

const STORE_NAME = 'general'
export const useGeneralStore = defineStore(STORE_NAME, () => {
  const router = useRouter()

  const isAuthenticated = computed(() => !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY))

  const user = computed<UserAuthInfo | null>(() => {
    const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    return !user ? null : JSON.parse(user)
  })

  const token = computed(() => localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY))

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
    localStorage.removeItem(LOCAL_STORAGE_DATA_E_HORA_DE_EXPIRACAO_KEY)
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
    router.push({ name: 'login' })
  }

  return {
    isAuthenticated,
    user,
    token,
    logout
  }
})
