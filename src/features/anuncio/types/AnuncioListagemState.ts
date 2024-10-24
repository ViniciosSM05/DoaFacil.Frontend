import type { AnuncioFiltro } from './AnuncioFiltro'
import type { AnuncioData } from './AnuncioData'

export interface AnuncioListagemState {
  filtro: AnuncioFiltro
  anuncios: AnuncioData[]
  loadingGetAnuncios: boolean
}
