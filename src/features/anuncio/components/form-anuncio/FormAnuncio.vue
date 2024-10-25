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
        <FormattedNumberInput
          v-model="store.state.form.meta"
          label="Meta"
          color="primary"
          :error="hasError('Meta')"
          :error-messages="getErrorMessages('Meta')"
        />

        <v-text-field
          v-model="store.state.form.titulo"
          label="Título"
          class="mb-4"
          color="primary"
          :error="hasError('Titulo')"
          :error-messages="getErrorMessages('Titulo')"
        />

        <v-textarea
          v-model="store.state.form.descricao"
          label="Descrição"
          class="mb-4"
          color="primary"
          rows="3"
          :error="hasError('Descricao')"
          :error-messages="getErrorMessages('Descricao')"
        />

        <CategoriaDropdown
          :value="store.state.form.categoriaId"
          @change="store.setFormCategoriaId($event ?? null)"
          label="Categoria"
          class="mb-4"
          color="primary"
          :error="hasError('CategoriaId')"
          :error-messages="getErrorMessages('CategoriaId')"
        />

        <v-text-field
          v-model="store.state.form.chavePix"
          label="Chave Pix"
          class="mb-4"
          color="primary"
          :error="hasError('ChavePix')"
          :error-messages="getErrorMessages('ChavePix')"
        />

        <v-file-input
          v-model="imgFile"
          label="Carregar Imagem"
          class="mb-4"
          color="primary"
          accept="image/*"
          clearable
          @click:clear="clearImagem"
          :error="hasError('Base64')"
          :error-messages="getErrorMessages('Base64')"
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
import router from '@/router'
import { onBeforeMount, onUnmounted, ref, watch } from 'vue'
import { base64ToFile, convertToBase64 } from '@/utils/img.utils'
import { useErrorFiedService } from '@/services/error-field/error-field-service'
import { useAnuncioFormStore } from '../../store/anuncio-form-store'
import { useNotificationStore } from '@/stores/notification/notification-store'
import type { FormAnuncioProps } from '../../types/FormAnuncioProps'
import CategoriaDropdown from '@/components/categoria-dropdown/CategoriaDropdown.vue'
import FormattedNumberInput from '@/components/formatted-number-input/FormattedNumberInput.vue'

const props = defineProps<FormAnuncioProps>()

const store = useAnuncioFormStore()
const notificationStore = useNotificationStore()
const { getErrorMessages, hasError } = useErrorFiedService(() => store.state.errors)

const imgFile = ref<File | null>(null)

watch(imgFile, (newFile) => {
  if (newFile) {
    convertToBase64(newFile).then(store.setFormImagemBase64)
    store.setFormImagemNome(newFile.name)
    store.setFormImagemTipo(newFile.type)
  } else clearImagem()
})

const clearImagem = () => {
  store.setFormImagemBase64(null)
  store.setFormImagemNome(null)
  store.setFormImagemTipo(null)
  imgFile.value = null
}

const salvar = () =>
  store.add(
    (updated) => {
      clearImagem()
      notificationStore.showNotificationSuccess(
        `Anúncio ${updated ? 'atualizado' : 'cadastrado'} com sucesso!`
      )
      setTimeout(() => router.push({ name: 'anuncios' }), 2000)
    },
    () => notificationStore.showNotificationError('Por favor, revise os campos!')
  )

onBeforeMount(
  () =>
    props.id &&
    store.initEdit(props.id, ({ imagem }) => {
      imgFile.value = base64ToFile(imagem.base64, imagem.nome, imagem.tipo)
    })
)

onUnmounted(() => store.destroy())
</script>
