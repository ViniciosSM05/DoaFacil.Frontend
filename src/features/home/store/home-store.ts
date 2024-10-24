import { ref } from 'vue'
import { defineStore } from 'pinia'
import { EnumFiltroData } from '@/enums/filtro/EnumFiltroData'
import { cloneDeep } from 'lodash'
import { useAnuncioApi } from '@/features/anuncio'
import type { AnuncioFiltro } from '@/features/anuncio'
import type { HomeState } from '../types/HomeState'

const STORE_NAME = 'home'
export const useHomeStore = defineStore(STORE_NAME, () => {
  const api = useAnuncioApi()

  const _defaultFiltro: AnuncioFiltro = {
    categoriaId: null,
    somenteAnuncioPessoal: false,
    take: 3,
    data: EnumFiltroData.Qualquer,
    search: null
  }

  const _defaultState: HomeState = {
    filtro: cloneDeep(_defaultFiltro),
    anuncios: [],
    loadingGetAnuncios: false
  }

  const state = ref<HomeState>(cloneDeep(_defaultState))

  const setFiltroCategoriaId = (categoriaId: string | null) =>
    (state.value.filtro.categoriaId = categoriaId)

  const limparFiltros = () => (state.value.filtro = cloneDeep(_defaultFiltro))

  const refreshAnuncios = (callbackSuccess?: () => void) => {
    state.value.loadingGetAnuncios = true
    api
      .get(state.value.filtro)
      .then(({ data }) => {
        if (data.success) {
          state.value.anuncios = data.data
          callbackSuccess && callbackSuccess()
        }
      })
      .catch(console.error)
      .finally(() => (state.value.loadingGetAnuncios = false))
  }

  const destroy = () => (state.value = cloneDeep(_defaultState))

  return {
    state,
    setFiltroCategoriaId,
    limparFiltros,
    refreshAnuncios,
    destroy
  }
})
