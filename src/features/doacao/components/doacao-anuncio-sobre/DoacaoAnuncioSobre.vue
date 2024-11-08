<template>
  <div class="doacao-anuncio-sobre">
    <h3 class="text-h6 font-weight-bold mb-4">Sobre</h3>
    <div class="text-body-1">
      Você pode ajudar via pix usando a chave: <span class="chave-pix">{{ pix }}</span>
    </div>
    <div class="text-subtitle-2 mb-4">
      <strong>Data do anúncio:</strong> {{ moment(data).format('DD/MM/YYYY') }}
    </div>
    <div class="text-body-1">{{ descricao }}</div>
  </div>
</template>
<style scoped lang="less" src="./doacao-anuncio-sobre.less"></style>

<script setup lang="ts">
import type { DoacaoAnuncioSobreProps } from '../../types/DoacaoAnuncioSobreProps'
import moment from 'moment'

defineProps<DoacaoAnuncioSobreProps>()
</script>
