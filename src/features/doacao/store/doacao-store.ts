import { ref } from 'vue'
import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'
import { useAnuncioApi } from '@/features/anuncio'
import type { DoacaoState } from '../types/DoacaoState'
import { useDoacaoApi } from '../api/doacao-api'

const STORE_NAME = 'doacao'
export const useDoacaoStore = defineStore(STORE_NAME, () => {
  const anuncioApi = useAnuncioApi()
  const doacaoApi = useDoacaoApi()

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
    },
    valor: 0,
    errors: []
  }

  const state = ref<DoacaoState>(cloneDeep(_defaultState))

  const init = (anuncioId: string, callbackSuccess?: () => void, callbackError?: () => void) => {
    anuncioApi
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

  const doar = (callbackSuccess?: () => void, callbackError?: () => void) => {
    doacaoApi
      .add({
        anuncioId: state.value.anuncio.id,
        valor: state.value.valor
      })
      .then(({ data }) => {
        if (data.success) {
          state.value.errors = []
          callbackSuccess && callbackSuccess()
        }
      })
      .catch((resp) => {
        state.value.errors = resp.response?.data?.fieldMessages ?? []
        callbackError && callbackError()
      })
  }

  const destroy = () => (state.value = cloneDeep(_defaultState))

  return {
    state,
    init,
    doar,
    destroy
  }
})
