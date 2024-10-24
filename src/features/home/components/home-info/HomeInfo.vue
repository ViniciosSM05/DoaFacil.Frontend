<template>
  <div class="home-info">
    <v-img :src="home_flower_logo" height="400" class="d-flex align-center justify-center" contain>
      <v-row class="overlay">
        <v-col class="text-center">
          <p class="display-2 font-weight-bold mb-2">Inspire Mudanças!</p>
          <p class="subheading">
            Amplie vozes de histórias tocantes, unindo aqueles que buscam apoio a quem deseja
            contribuir.
          </p>
          <v-row justify="center" class="mt-4">
            <v-btn color="primary" class="mx-2" @click="$router.push({ name: 'cadastrarAnuncio' })"
              >Criar Anúncio</v-btn
            >
            <v-btn color="secondary" class="mx-2" @click="$router.push({ name: 'anuncios' })"
              >Ver Anúncios</v-btn
            >
          </v-row>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>
<style lang="less" scoped src="./home-info.less"></style>

<script setup lang="ts">
import home_flower_logo from '@/assets/svg/home_flower_logo.svg'
</script>
