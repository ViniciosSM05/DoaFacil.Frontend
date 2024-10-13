<template>
  <div class="user-login-form">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" min-width="448" rounded="lg">
      <v-form @submit.prevent="login">
        <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
        <v-text-field
          density="compact"
          color="primary"
          placeholder="exemplo@email.com"
          prepend-inner-icon="mdi-email-outline"
          v-model="store.state.user.email"
          :error="hasError('email')"
          :error-messages="getErrorMessages('email')"
        />

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Senha
        </div>

        <v-text-field
          :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="passwordVisible ? 'text' : 'password'"
          density="compact"
          color="primary"
          placeholder="entre com sua senha"
          prepend-inner-icon="mdi-lock-outline"
          v-model="store.state.user.senha"
          @click:append-inner="passwordVisible = !passwordVisible"
          :error="hasError('senha')"
          :error-messages="getErrorMessages('senha')"
        />

        <v-btn class="mb-8" type="submit" color="primary" size="large" variant="tonal" block>
          Entrar
        </v-btn>

        <v-card-text class="text-center">
          <RouterLink
            class="text-primary text-decoration-none"
            to="/register"
            rel="noopener noreferrer"
          >
            Crie sua conta <v-icon icon="mdi-chevron-right" />
          </RouterLink>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>
<style lang="less" scoped src="./user-login-form.less"></style>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserLoginStore } from '../../store/user-login-store'
import { useErrorFiedService } from '@/services/error-field/error-field-service'
import { useNotificationStore } from '@/stores/notification/notification-store'

const store = useUserLoginStore()
const notificationStore = useNotificationStore()
const { hasError, getErrorMessages } = useErrorFiedService(() => store.state.errors)

const passwordVisible = ref(false)

const login = () => {
  store.login(
    () => {
      notificationStore.showNotificationSuccess('Bem-vindo!')
    },
    () => notificationStore.showNotificationError('Por favor, revise os campos!')
  )
}

onUnmounted(() => store.destroy())
</script>
