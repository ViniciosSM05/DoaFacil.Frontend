import { EnumStatusCode } from '@/enums/http/EnumStatusCode'
import { useGeneralStore } from '@/stores/general/general-store'
import type { ResponseApi } from '@/types/api/ResponseApi'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const defineAxios = () => {
  const API_BASE_URL = 'http://localhost:5076/'
  const generalStore = useGeneralStore()
  const router = useRouter()

  axios.interceptors.request.use((config) => {
    config.baseURL = API_BASE_URL
    config.headers.Authorization = `Bearer ${generalStore.token}`
    return config
  })

  axios.interceptors.response.use(
    (response) => {
      const data = response.data as ResponseApi
      const hasError = data?.success === false
      if (hasError) return Promise.reject({ response })
      return response
    },
    (error) => {
      if (error.response && error.response.status === EnumStatusCode.UNAUTHORIZED)
        generalStore.logout()
      return Promise.reject(error)
    }
  )
}
