<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'
import { defineAxios } from './services/axios/axios.service'
import { useNotificationStore } from './stores/notification/notification-store'

const notificationStore = useNotificationStore()

onBeforeMount(() => defineAxios())
</script>

<template>
  <div class="doa-facil-app">
    <v-snackbar
      location="top right"
      v-model="notificationStore.state.visible"
      :timeout="notificationStore.state.timeoutInSeconds * 1000"
      :color="notificationStore.state.type"
    >
      {{ notificationStore.state.message }}
    </v-snackbar>
    <v-app>
      <RouterView />
    </v-app>
  </div>
</template>
