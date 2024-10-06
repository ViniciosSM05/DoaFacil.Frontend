import type { ResponseApi } from '@/types/api/ResponseApi'
import axios from 'axios'

export const defineAxios = () => {
  const API_BASE_URL = 'http://localhost:5076/'
  //const { token, apiBaseUrl } = useGeneralStore()

  axios.interceptors.request.use((config) => {
    // config.headers.Authorization = `Bearer ${token}`
    config.baseURL = API_BASE_URL
    return config
  })

  axios.interceptors.response.use((resp) => {
    const data = resp.data as ResponseApi
    const hasError = data?.success === false
    if (hasError) return Promise.reject({ response: resp })
    return resp
  })
}
