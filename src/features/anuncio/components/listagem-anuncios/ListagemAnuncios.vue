<template>
  <div class="listagem-anuncios">
    <v-row v-if="store.state.anuncios.length">
      <v-col v-for="(anuncio, i) in store.state.anuncios" :key="i" cols="12" md="4">
        <CardAnuncio
          :id="anuncio.id"
          :imagem-base64="anuncio.imagemBase64"
          :titulo="anuncio.titulo"
          :nome-categoria="anuncio.nomeCategoria"
          :codigo="anuncio.codigo"
          :anunciante="anuncio.anunciante"
          :meta="anuncio.meta"
          :doado="anuncio.doado"
          :data-anuncio="anuncio.dataAnuncio"
          :anuncio-pessoal="anuncio.anuncioPessoal"
        />
      </v-col>
    </v-row>
    <NenhumAnuncioEncontrado v-else />
  </div>
</template>
<style lang="less" scoped src="./listagem-anuncios.less"></style>

<script setup lang="ts">
import CardAnuncio from '../card-anuncio/CardAnuncio.vue'
import NenhumAnuncioEncontrado from '../nenhum-anuncio-encontrado/NenhumAnuncioEncontrado.vue'
import { useAnuncioListagemStore } from '../../store/anuncio-listagem-store'
import { onMounted } from 'vue'

const store = useAnuncioListagemStore()

onMounted(() => store.refreshAnuncios())
</script>
