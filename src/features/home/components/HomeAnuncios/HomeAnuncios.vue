<template>
  <div class="home-anuncios">
    <v-row>
      <v-col v-for="(ad, i) in ads" :key="i" cols="12" md="4">
        <CardAnuncio
          :id="i.toString()"
          :anunciante="ad.ownerName"
          :codigo="ad.code"
          :doado="ad.donated"
          :img="ad.image"
          :meta="ad.goal"
          :nome-categoria="ad.category"
          :titulo="ad.title"
        />
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="auto">
        <router-link to="/ver-mais" class="text-decoration-none">
          <span class="text-primary font-weight-bold small">
            Ver mais
            <v-icon start small>mdi-arrow-right</v-icon>
          </span>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="less" scoped src="./home-anuncios.less"></style>

<script lang="ts" setup>
import { ref } from 'vue'
import { CardAnuncio } from '@/features/anuncio'

const ads = ref([
  {
    image: 'https://undraw.co/api/image/random', // Exemplo de URL da imagem do anúncio
    title: 'Ajude Maria a construir seu futuro',
    category: 'Educação',
    code: 1,
    ownerName: 'Maria Silva',
    goal: 5000,
    donated: 1200
  },
  {
    image: 'https://undraw.co/api/image/random',
    title: 'Apoie o tratamento de João',
    category: 'Saúde',
    code: 2,
    ownerName: 'João Ferreira',
    goal: 15000,
    donated: 8500
  },
  {
    image: 'https://undraw.co/api/image/random',
    title: 'Doe para o projeto social de Paulo',
    category: 'Comunidade',
    code: 3,
    ownerName: 'Paulo Souza',
    goal: 8000,
    donated: 3000
  }
])
</script>
