<template>
  <div class="doacao-anuncio-detalhes">
    <v-card class="pa-4 container-card d-flex flex-column align-center">
      <v-progress-linear
        :model-value="progress"
        color="primary"
        height="8"
        class="mb-4"
      ></v-progress-linear>
      <div class="text-h6 font-weight-bold mb-2">
        {{ formatCurrency(doado) }} / {{ formatCurrency(meta) }}
      </div>
      <div class="text-body-2 mb-2">
        Apoiadores: <strong>{{ apoiadores }}</strong>
      </div>
      <div class="text-body-1 primary--text mb-4"><span>Chave pix:</span> {{ pix }}</div>
      <FormattedNumberInput v-model="valor" label="Quero ajudar" color="primary" />
      <v-btn color="primary" class="btn-doar text-h5"> DOAR </v-btn>
      <v-divider class="line my-4" />
      <div class="d-flex align-center">
        <v-avatar size="40" color="primary" class="mr-2">{{ inicialAnunciante }}</v-avatar>
        <span class="text-subtitle-2">{{ anunciante }}</span>
      </div>
    </v-card>
  </div>
</template>
<style lang="less" scoped src="./doacao-anuncio-detalhes.less"></style>

<script setup lang="ts">
import { formatCurrency } from '@/utils/currency.utils'
import { computed, ref } from 'vue'
import { defineProps } from 'vue'
import FormattedNumberInput from '@/components/formatted-number-input/FormattedNumberInput.vue'
import type { DoacaoAnuncioDetalhesProps } from '../../types/DoacaoAnuncioDetalhesProps'

const props = defineProps<DoacaoAnuncioDetalhesProps>()

const valor = ref(0)

const progress = computed(() => Math.min((props.doado / props.meta) * 100, 100))
const inicialAnunciante = computed(() => props.anunciante.slice(0, 2).toUpperCase())
</script>
