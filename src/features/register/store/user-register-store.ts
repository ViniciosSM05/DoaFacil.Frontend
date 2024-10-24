import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserRegisterApi } from '../api/user-register-api'
import { removerCaracteresEspeciais } from '@/utils/string.utils'
import type { UserRegisterState } from '../types/UserRegisterState'
import type { UfData } from '@/components/uf-dropdown/types/UfData'
import type { ViaCepResponse } from '../types/ViaCepResponse'
import { cloneDeep } from 'lodash'

const STORE_NAME = 'user_register'
const URL_VIA_CEP = 'https://viacep.com.br/ws/{cep}/json/'
export const useUserRegisterStore = defineStore(STORE_NAME, () => {
  const api = useUserRegisterApi()

  const _defaultState: UserRegisterState = {
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
  }

  const state = ref<UserRegisterState>(cloneDeep(_defaultState))

  const setUfId = (ufId: string | null) => {
    state.value.toAdd.endereco.cidade.ufId = ufId
  }

  const setCidadeNome = (cidadeNome: string) =>
    (state.value.toAdd.endereco.cidade.nome = cidadeNome)

  const setCpfCnpj = (cpfCnpj: string) => (state.value.toAdd.cpfCnpj = cpfCnpj)

  const register = (callbackSuccess?: () => void, callbackError?: () => void) => {
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
      .finally(() => (state.value.loadingRegister = false))
  }

  const handleCep = (
    cep: string,
    ufs: UfData[],
    callbackSuccess?: (param: ViaCepResponse) => void
  ) => {
    state.value.toAdd.endereco.cep = cep
    if (!cep) return

    fetch(URL_VIA_CEP.replace('{cep}', cep))
      .then((resp) => resp.json())
      .then((resp: ViaCepResponse) => {
        const { erro, logradouro, uf, localidade, bairro } = resp

        if (!erro) {
          state.value.toAdd.endereco.rua = logradouro
          state.value.toAdd.endereco.bairro = bairro
          state.value.toAdd.endereco.cidade = {
            nome: localidade,
            ufId: ufs.find((x) => x.sigla === uf)?.id ?? null
          }
          callbackSuccess && callbackSuccess(resp)
        }
      })
  }

  const destroy = () => (state.value = cloneDeep(_defaultState))

  return {
    state,
    setUfId,
    setCidadeNome,
    register,
    handleCep,
    setCpfCnpj,
    destroy
  }
})
