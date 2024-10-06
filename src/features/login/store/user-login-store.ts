import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserRegisterApi } from '../api/user-login-api'
import type { UserLoginState } from '../types/UserLoginState'
import { cloneDeep } from 'lodash'

const STORE_NAME = 'userLogin'
export const useUserLoginStore = defineStore(STORE_NAME, () => {
  const api = useUserRegisterApi()

  const _defaultState: UserLoginState = {
    loading: false,
    errors: [],
    user: {
      email: '',
      senha: ''
    }
  }

  const state = ref<UserLoginState>(cloneDeep(_defaultState))

  const login = (callbackSuccess?: () => void, callbackError?: () => void) => {
    state.value.loading = true
    api
      .login(state.value.user)
      .then(({ data: { success, data } }) => {
        state.value.errors = []
        if (success) {
          localStorage.setItem('dataEHoraDeExpiracao', data.dataEHoraDeExpiracao)
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          callbackSuccess && callbackSuccess()
        }
      })
      .catch((resp) => {
        state.value.errors = resp.response?.data?.fieldMessages ?? []
        callbackError && callbackError()
      })
      .finally(() => (state.value.loading = false))
  }

  const destroy = () => (state.value = cloneDeep(_defaultState))

  return { state, login, destroy }
})
