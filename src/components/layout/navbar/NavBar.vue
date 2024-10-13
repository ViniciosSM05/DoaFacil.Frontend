<template>
  <div class="navbar">
    <v-app-bar color="white" elevation="2">
      <v-container fluid class="centered container-nav">
        <v-row align="center" justify="space-between">
          <v-app-bar-title>
            <span class="font-weight-bold">Doa Fácil</span>
          </v-app-bar-title>

          <v-btn variant="text" to="/">Home</v-btn>
          <v-btn variant="text" to="/anuncios">Anúncios</v-btn>
          <v-btn variant="text" to="/como-funciona">Como Funciona</v-btn>
          <v-btn variant="text" to="/sobre">Sobre</v-btn>
          <v-btn variant="text" to="/contato">Contato</v-btn>
          <v-btn variant="text" class="d-flex align-center">
            <v-icon class="mr-1">mdi-account</v-icon>
            <span>{{ generalStore.user?.nome ?? '' }}</span>
          </v-btn>
          <v-btn color="primary" @click="generalStore.logout">Sair</v-btn>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>
<style lang="less" scoped src="./navbar.less"></style>
<script setup lang="ts">
import { useGeneralStore } from '@/stores/general/general-store'

const generalStore = useGeneralStore()
</script>
