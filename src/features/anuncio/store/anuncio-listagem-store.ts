import { ref } from 'vue'
import { defineStore } from 'pinia'
import { EnumFiltroData } from '@/enums/filtro/EnumFiltroData'
import { cloneDeep } from 'lodash'
import { useAnuncioApi } from '../api/anuncio-api'
import type { AnuncioFiltro } from '../types/AnuncioFiltro'
import type { AnuncioListagemState } from '../types/AnuncioListagemState'

const STORE_NAME = 'anuncioListagem'
export const useAnuncioListagemStore = defineStore(STORE_NAME, () => {
  const api = useAnuncioApi()

  const _defaultFiltro: AnuncioFiltro = {
    categoriaId: null,
    somenteAnuncioPessoal: false,
    take: null,
    data: EnumFiltroData.Qualquer,
    search: null
  }

  const _defaultState: AnuncioListagemState = {
    filtro: cloneDeep(_defaultFiltro),
    anuncios: [],
    loadingGetAnuncios: false
  }

  const state = ref<AnuncioListagemState>(cloneDeep(_defaultState))

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

  const setFiltro = (filtro: AnuncioFiltro) => (state.value.filtro = filtro)

  const destroy = () => (state.value = cloneDeep(_defaultState))

  return {
    state,
    setFiltroCategoriaId,
    limparFiltros,
    refreshAnuncios,
    setFiltro,
    destroy
  }
})
