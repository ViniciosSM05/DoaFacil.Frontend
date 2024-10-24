<template>
  <div class="home-anuncios">
    <template v-if="store.state.anuncios.length">
      <v-row>
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
      <v-row justify="end">
        <v-col cols="auto">
          <router-link to="/anuncios" class="text-decoration-none">
            <span class="text-primary font-weight-bold small">
              Ver mais
              <v-icon start small>mdi-arrow-right</v-icon>
            </span>
          </router-link>
        </v-col>
      </v-row>
    </template>
    <HomeNenhumAnuncioEncontrado v-else />
  </div>
</template>
<style lang="less" scoped src="./home-anuncios.less"></style>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { CardAnuncio } from '@/features/anuncio'
import { useHomeStore } from '../../store/home-store'
import HomeNenhumAnuncioEncontrado from '../home-nenhum-anuncio-encontrado/HomeNenhumAnuncioEncontrado.vue'

const store = useHomeStore()

onMounted(() => store.refreshAnuncios())
</script>
