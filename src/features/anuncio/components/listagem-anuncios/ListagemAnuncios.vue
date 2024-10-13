<template>
  <div class="listagem-anuncios">
    <v-row>
      <v-col v-for="(ad, i) in ads" :key="i" cols="12" md="4">
        <CardAnuncio
          :id="i.toString()"
          :anunciante="ad.anunciante"
          :codigo="ad.codigo"
          :doado="ad.doado"
          :img="ad.img"
          :meta="ad.meta"
          :nome-categoria="ad.nomeCategoria"
          :titulo="ad.titulo"
        />
      </v-col>
    </v-row>
  </div>
</template>
<style lang="less" scoped src="./listagem-anuncios.less"></style>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { CardAnuncioProps } from '../../types/CardAnuncioProps'
import CardAnuncio from '../card-anuncio/CardAnuncio.vue'

const props = defineProps<{
  ads: CardAnuncioProps[]
}>()
</script>
