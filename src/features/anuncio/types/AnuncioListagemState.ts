import type { EnumFiltroData } from '@/enums/filtro/EnumFiltroData'

export interface AnuncioListagemState {
  filtro: FiltroAnuncioListagem
  anuncios: []
}

export interface FiltroAnuncioListagem {
  search: string | null
  categoriaId: string | null
  data: EnumFiltroData
}
