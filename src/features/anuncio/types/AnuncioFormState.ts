import type { ValidationFailuresBase } from '@/types/api/ValidationFailuresBase'

export interface AnuncioFormState extends ValidationFailuresBase {
  form: AnuncioToSave
  loadingAdd: boolean
}

export interface AnuncioToSave {
  id: string | null
  meta: number
  titulo: string
  descricao: string
  categoriaId: string | null
  chavePix: string | null
  imagem: ImagemAnuncioToSave
}

export interface ImagemAnuncioToSave {
  nome: string | null
  base64: string | null
  tipo: string | null
  principal: boolean
}
