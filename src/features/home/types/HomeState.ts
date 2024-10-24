import type { AnuncioData, AnuncioFiltro } from '@/features/anuncio'

export interface HomeState {
  filtro: AnuncioFiltro
  anuncios: AnuncioData[]
  loadingGetAnuncios: boolean
}
