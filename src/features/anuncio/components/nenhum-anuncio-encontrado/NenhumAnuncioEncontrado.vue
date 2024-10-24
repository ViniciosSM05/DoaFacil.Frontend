<template>
  <div class="nenhum-anuncio">
    <v-container class="d-flex flex-column align-center justify-center text-center">
      <v-icon size="64" color="primary" class="mb-4">mdi-alert-circle-outline</v-icon>
      <p class="text-h5 mb-2">Nenhum anúncio encontrado</p>
      <p class="text-body-1 mb-4">
        Não conseguimos encontrar nenhum anúncio com os filtros aplicados.
      </p>
    </v-container>
  </div>
</template>

<style scoped lang="less">
.nenhum-anuncio {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-container {
  max-width: 400px;
}
</style>
