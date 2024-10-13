<template>
  <div class="form-anuncio">
    <div>
      <h1 class="text-h4 font-weight-bold text-primary mb-4">
        Vamos começar a sua jornada de arrecadação
      </h1>
      <p class="text-subtitle-1 mb-6 font-weight-bold">
        Estamos aqui para auxiliar você ao longo desse caminho.
      </p>

      <v-form>
        <FormattedNumberInput v-model="form.meta" label="Meta" color="primary" />

        <v-text-field v-model="form.titulo" label="Título" class="mb-4" color="primary" />

        <v-textarea
          v-model="form.descricao"
          label="Descrição"
          class="mb-4"
          color="primary"
          rows="3"
        />

        <CategoriaDropdown
          v-model="form.categoria"
          label="Categoria"
          class="mb-4"
          color="primary"
        />

        <v-text-field v-model="form.pix" label="Chave Pix" class="mb-4" color="primary" />

        <v-file-input
          v-model="form.imagem"
          label="Carregar Imagem"
          class="mb-4"
          color="primary"
          accept="image/*"
        />

        <p class="text-caption mb-4">
          Ao clicar no botão abaixo você declara que é maior de 18 anos.
        </p>

        <v-btn class="primary-button" color="primary" @click="salvar" block> Salvar </v-btn>
      </v-form>
    </div>
  </div>
</template>
<style lang="less" scoped src="./form-anuncio.less"></style>

<script setup lang="ts">
import { ref } from 'vue'
import CategoriaDropdown from '@/components/categoria-dropdown/CategoriaDropdown.vue'
import FormattedNumberInput from '@/components/formatted-number-input/FormattedNumberInput.vue'

const form = ref({
  meta: 0,
  titulo: '',
  descricao: '',
  categoria: '',
  pix: '',
  imagem: null as File | null
})

const salvar = () => {
  console.log('Dados do formulário:', form.value)
}
</script>
