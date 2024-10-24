<template>
  <div class="home-nenhum-anuncio">
    <v-container class="d-flex flex-column align-center justify-center text-center">
      <v-icon size="64" color="primary" class="mb-4">mdi-alert-circle-outline</v-icon>
      <p class="text-h5 mb-2">Por enquanto não temos nenhum anúncio cadastrado...</p>
      <p class="text-body-1 mb-4">
        Cadastre seu anúncio rapidamente
        <router-link to="cadastrar-anuncio">clicando aqui!</router-link>
      </p>
    </v-container>
  </div>
</template>

<style scoped lang="less">
.home-nenhum-anuncio {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-container {
  max-width: 420px;

  a {
    color: @primary-color;
    text-decoration: underline;
    font-weight: 600;
  }
}
</style>
