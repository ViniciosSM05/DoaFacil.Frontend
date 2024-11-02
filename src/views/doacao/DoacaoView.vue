<template>
  <div class="doacao-view">
    <v-container>
      <DoacaoAnuncioHeader
        :categoria="anuncio.nomeCategoria"
        :titulo="anuncio.titulo"
        :codigo="anuncio.codigo"
      />

      <v-row class="mt-4" align="start">
        <v-col md="8" class="col-imagens d-flex justify-center">
          <v-card class="container-imagem pa-4">
            <v-img :src="anuncio.imagemBase64" class="anuncio-img" />
          </v-card>
        </v-col>
        <v-col md="4" class="col-detalhes d-flex justify-center">
          <DoacaoAnuncioDetalhes
            :doado="anuncio.arrecadado"
            :meta="anuncio.meta"
            :apoiadores="anuncio.totalApoiadores"
            :pix="anuncio.chavePix"
            :anunciante="anuncio.anunciante"
          />
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col md="12">
          <v-card class="pa-4">
            <DoacaoAnuncioSobre
              :pix="anuncio.chavePix"
              :data="anuncio.dataAnuncio"
              :descricao="anuncio.descricao"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style lang="less" scoped src="./doacao-view-.less"></style>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import {
  DoacaoAnuncioHeader,
  DoacaoAnuncioDetalhes,
  DoacaoAnuncioSobre,
  useDoacaoStore
} from '@/features/doacao'
import { useRoute } from 'vue-router'

const store = useDoacaoStore()
const route = useRoute()

const anuncio = computed(() => store.state.anuncio)

onBeforeMount(() => store.init((route.params?.anuncioId ?? '').toString()))
</script>
