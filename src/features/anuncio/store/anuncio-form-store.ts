import { ref } from 'vue'
import { defineStore } from 'pinia'
import { clone, cloneDeep } from 'lodash'
import { useAnuncioApi } from '../api/anuncio-api'
import type { AnuncioFormState } from '../types/AnuncioFormState'

const STORE_NAME = 'anuncioForm'
export const useAnuncioFormStore = defineStore(STORE_NAME, () => {
  const api = useAnuncioApi()

  const _defaultState: AnuncioFormState = {
    form: {
      id: null,
      meta: 0,
      titulo: '',
      descricao: '',
      categoriaId: null,
      chavePix: '',
      imagem: {
        nome: null,
        base64: null,
        tipo: null,
        principal: true
      }
    },
    loadingAdd: false,
    errors: []
  }

  const state = ref<AnuncioFormState>(cloneDeep(_defaultState))

  const setFormCategoriaId = (categoriaId: string | null) =>
    (state.value.form.categoriaId = categoriaId)

  const setFormImagemBase64 = (imagemBase64: string | null) =>
    (state.value.form.imagem.base64 = imagemBase64)

  const setFormImagemNome = (nome: string | null) => (state.value.form.imagem.nome = nome)

  const setFormImagemTipo = (tipo: string | null) => (state.value.form.imagem.tipo = tipo)

  const add = (callbackSuccess?: () => void, callbackError?: () => void) => {
    state.value.loadingAdd = true
    api
      .add(state.value.form)
      .then(({ data }) => {
        state.value.errors = []
        if (data.success) {
          destroy()
          callbackSuccess && callbackSuccess()
        }
      })
      .catch((resp) => {
        state.value.errors = resp.response?.data?.fieldMessages ?? []
        callbackError && callbackError()
      })
      .finally(() => (state.value.loadingAdd = false))
  }

  const destroy = () => (state.value = cloneDeep(_defaultState))

  return {
    state,
    setFormCategoriaId,
    setFormImagemBase64,
    setFormImagemNome,
    setFormImagemTipo,
    add,
    destroy
  }
})
