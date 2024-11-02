<template>
  <div class="doacao-anuncio-header">
    <div class="text-center">
      <div class="text-overline font-weight-bold categoria">{{ categoria }}</div>
      <div class="text-h4 font-weight-bold">{{ titulo }}</div>
      <div class="text-subtitle-1 mt-2 codigo">CÓDIGO: {{ insertZeroBefore(codigo) }}</div>
    </div>
  </div>
</template>
<style scoped lang="less" src="./doacao-anuncio-header.less"></style>

<script setup lang="ts">
import { defineProps } from 'vue'
import { insertZeroBefore } from '@/utils/number.utils'
import type { DoacaoAnuncioHeaderProps } from '../../types/DoacaoAnuncioHeaderProps'

const props = defineProps<DoacaoAnuncioHeaderProps>()
</script>
