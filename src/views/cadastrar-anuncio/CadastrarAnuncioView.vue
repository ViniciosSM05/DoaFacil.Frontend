<template>
  <div class="cadastrar-anuncio-view">
    <FormAnuncio :id="$route.params.id?.toString() ?? undefined" />
  </div>
</template>
<style lang="less" scoped src="./cadastrar-anuncio-view.less"></style>

<script setup lang="ts">
import { FormAnuncio } from '@/features/anuncio/'
</script>
