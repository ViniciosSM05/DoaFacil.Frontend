export interface AuthInfo {
  dataEHoraDeExpiracao: string
  token: string
  user: UserAuthInfo
}

export interface UserAuthInfo {
  id: string
  nome: string
  email: string
}
