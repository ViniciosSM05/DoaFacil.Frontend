import type { ValidationFailuresBase } from '@/types/api/ValidationFailuresBase'

export interface UserLoginState extends ValidationFailuresBase {
  loading: boolean
  user: UserEmailSenha
}

export interface UserEmailSenha {
  email: string
  senha: string
}
