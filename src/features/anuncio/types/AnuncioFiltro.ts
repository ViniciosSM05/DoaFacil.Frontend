import type { EnumFiltroData } from '@/enums/filtro/EnumFiltroData'

export interface AnuncioFiltro {
  somenteAnuncioPessoal: boolean
  search: string | null
  data: EnumFiltroData
  categoriaId: string | null
  take: number | null
}
