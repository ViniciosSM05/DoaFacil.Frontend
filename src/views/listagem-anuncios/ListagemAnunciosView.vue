<template>
  <div class="listagem-anuncios-view">
    <v-container>
      <v-row>
        <v-col md="12" class="mb-10 d-flex align-center justify-center">
          <h1 class="explorar-title text-h5">Explore os Anúncios</h1>
        </v-col>
      </v-row>

      <FiltroListagemAnuncios />

      <ListagemAnuncios />
    </v-container>
  </div>
</template>
<style lang="less" scoped src="./listagem-anuncios-view.less"></style>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { FiltroListagemAnuncios, ListagemAnuncios } from '@/features/anuncio'
import { useAnuncioListagemStore } from '@/features/anuncio/'

const store = useAnuncioListagemStore()

onUnmounted(() => store.destroy())
</script>
