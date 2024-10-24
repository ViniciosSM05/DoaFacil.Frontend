<template>
  <div class="home-view">
    <v-container fluid>
      <v-row>
        <v-col>
          <HomeInfo />
        </v-col>
      </v-row>
      <v-row class="my-5">
        <v-col>
          <HomeFiltro />
        </v-col>
      </v-row>
      <v-row>
        <HomeAnuncios />
      </v-row>
    </v-container>
  </div>
</template>
<style lang="less" scoped src="./home-view.less"></style>

<script setup lang="ts">
import { HomeInfo, HomeFiltro, HomeAnuncios } from '@/features/home'
import { useHomeStore } from '@/features/home'
import { onUnmounted } from 'vue'

const store = useHomeStore()

onUnmounted(() => store.destroy())
</script>
