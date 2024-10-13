<template>
  <div class="card-anuncio">
    <v-card class="info-card" max-width="400">
      <v-img :src="img" height="200px" class="anuncio-img" />

      <v-card-text>
        <p class="anuncio-title font-weight-bold">{{ titulo }}</p>

        <div class="anuncio-categoria">
          <span>{{ nomeCategoria }}</span> | <span>Código: {{ insertZeroBefore(codigo) }}</span>
        </div>

        <div class="anuncio-anunciante d-flex align-center mt-3">
          <v-avatar color="primary" class="mr-2">
            <span>{{ anunciante.slice(0, 2).toUpperCase() }}</span>
          </v-avatar>
          <span>{{ anunciante }}</span>
        </div>

        <v-divider class="my-3"></v-divider>

        <div class="anuncio-meta">
          <div class="d-flex justify-space-between">
            <span>Doado: {{ formatCurrency(doado) }}</span>
            <span>Meta: {{ formatCurrency(meta) }}</span>
          </div>

          <v-progress-linear
            :model-value="calculateProgress(doado, meta)"
            color="primary"
            height="8"
            class="mt-2"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<style scoped lang="less" src="./card-anuncio.less"></style>

<script setup lang="ts">
import { formatCurrency } from '@/utils/currency.utils'
import type { CardAnuncioProps } from '../../types/CardAnuncioProps'
import { insertZeroBefore } from '@/utils/number.utils'

const props = defineProps<CardAnuncioProps>()

const calculateProgress = (donated: number, goal: number) => {
  return Math.min((donated / goal) * 100, 100)
}
</script>
