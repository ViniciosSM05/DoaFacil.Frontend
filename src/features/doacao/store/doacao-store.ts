import { ref } from 'vue'
import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'
import { useAnuncioApi } from '@/features/anuncio'
import type { DoacaoState } from '../types/DoacaoState'

const STORE_NAME = 'doacao'
export const useDoacaoStore = defineStore(STORE_NAME, () => {
  const api = useAnuncioApi()

  const _defaultState: DoacaoState = {
    anuncio: {
      id: '',
      arrecadado: 0,
      chavePix: '',
      codigo: 0,
      dataAnuncio: '',
      descricao: '',
      imagemBase64: '',
      imagemBytes: new Uint8Array(),
      imagemTipo: '',
      meta: 0,
      nomeCategoria: '',
      titulo: '',
      totalApoiadores: 0,
      anunciante: ''
    }
  }

  const state = ref<DoacaoState>(cloneDeep(_defaultState))

  const init = (anuncioId: string, callbackSuccess?: () => void, callbackError?: () => void) => {
    api
      .getDetalhes(anuncioId)
      .then(({ data }) => {
        if (data.success) {
          state.value.anuncio = data.data
          callbackSuccess && callbackSuccess()
        }
      })
      .catch((resp) => {
        console.error(resp)
        callbackError && callbackError()
      })
  }

  const destroy = () => (state.value = cloneDeep(_defaultState))

  return {
    state,
    init,
    destroy
  }
})
