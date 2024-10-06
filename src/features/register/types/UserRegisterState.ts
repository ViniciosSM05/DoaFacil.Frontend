import type { ValidationFailuresBase } from '@/types/api/ValidationFailuresBase'

export interface UserRegisterState extends ValidationFailuresBase {
  toAdd: UserToAdd
  loadingRegister: boolean
}

export interface UserToAdd {
  nome: string
  cpfCnpj: string
  email: string
  senha: string
  celular: string
  dataNascimento: string | null
  endereco: EnderecoUsuario
}

export interface EnderecoUsuario {
  cep: string
  rua: string
  bairro: string
  numero: number | null
  cidade: Cidade
}

export interface Cidade {
  nome: string
  ufId: string | null
}
