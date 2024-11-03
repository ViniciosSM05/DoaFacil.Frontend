import type { AnuncioDetalhes } from '@/features/anuncio'
import type { ValidationFailuresBase } from '@/types/api/ValidationFailuresBase'

export interface DoacaoState extends ValidationFailuresBase {
  anuncio: AnuncioDetalhes
  valor: number
}
