import { ref } from 'vue'
import { defineStore } from 'pinia'
import { EnumFiltroData } from '@/enums/filtro/EnumFiltroData'
import type { AnuncioListagemState } from '../types/AnuncioListagemState'

const STORE_NAME = 'anuncioListagem'
export const useAnuncioListagemStore = defineStore(STORE_NAME, () => {
  const state = ref<AnuncioListagemState>({
    filtro: {
      categoriaId: null,
      data: EnumFiltroData.Qualquer,
      search: null
    },
    anuncios: []
  })

  const setFiltroCategoriaId = (categoriaId: string | null) =>
    (state.value.filtro.categoriaId = categoriaId)

  const limparFiltros = () => {
    state.value.filtro = {
      categoriaId: null,
      data: EnumFiltroData.Qualquer,
      search: null
    }
  }

  return {
    state,
    setFiltroCategoriaId,
    limparFiltros
  }
})
