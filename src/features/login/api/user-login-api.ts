import { useHttpService } from '@/services/http/http-service'
import type { ResponseApiT } from '@/types/api/ResponseApi'
import type { UserEmailSenha } from '../types/UserLoginState'
import type { AuthInfo } from '../types/AuthInfo'

export const useUserRegisterApi = () => {
  const http = useHttpService('usuarios')

  const login = (login: UserEmailSenha) => http.post<ResponseApiT<AuthInfo>>('auth', login)

  return {
    login
  }
}
