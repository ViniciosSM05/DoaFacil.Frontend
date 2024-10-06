import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserRegisterState } from '../types/UserRegisterState'
import { useUserRegisterApi } from '../api/user-register-api'
import { removerCaracteresEspeciais } from '@/utils/string.utils'

const STORE_NAME = 'user_register'
export const useUserRegisterStore = defineStore(STORE_NAME, () => {
  const api = useUserRegisterApi()

  const state = ref<UserRegisterState>({
    toAdd: {
      celular: '',
      cpfCnpj: '',
      dataNascimento: null,
      email: '',
      endereco: {
        bairro: '',
        cep: '',
        cidade: {
          nome: '',
          ufId: null
        },
        numero: null,
        rua: ''
      },
      nome: '',
      senha: ''
    },
    errors: [],
    loadingRegister: false
  })

  const setUfId = (ufId: string | null) => {
    state.value.toAdd.endereco.cidade.ufId = ufId
  }

  const setCidadeNome = (cidadeNome: string) =>
    (state.value.toAdd.endereco.cidade.nome = cidadeNome)

  const register = () => {
    state.value.loadingRegister = true
    api
      .add({
        ...state.value.toAdd,
        celular: removerCaracteresEspeciais(state.value.toAdd.celular),
        cpfCnpj: removerCaracteresEspeciais(state.value.toAdd.cpfCnpj),
        endereco: {
          ...state.value.toAdd.endereco,
          cep: removerCaracteresEspeciais(state.value.toAdd.endereco.cep)
        }
      })
      .then(() => {
        state.value.errors = []
      })
      .catch(({ response: { data } }) => {
        state.value.errors = data.fieldMessages
      })
      .finally(() => (state.value.loadingRegister = false))
  }

  return {
    state,
    setUfId,
    setCidadeNome,
    register
  }
})
