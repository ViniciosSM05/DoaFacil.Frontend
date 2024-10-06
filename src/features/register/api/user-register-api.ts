import { useHttpService } from '@/services/http/http-service'
import type { UserToAdd } from '../types/UserRegisterState'
import type { ResponseApiT } from '@/types/api/ResponseApi'

export const useUserRegisterApi = () => {
  const http = useHttpService('usuarios')

  const add = (user: UserToAdd) => http.post<ResponseApiT<string>>('', user)

  return {
    add
  }
}
