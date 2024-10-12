<template>
  <div class="categoria-dropdown">
    <v-autocomplete
      color="primary"
      no-data-text="Não foi encontrado nenhuma categoria"
      :placeholder="placeholder"
      :density="density"
      :label="label"
      :item-value="'id'"
      :item-title="'nome'"
      :items="categorias"
      :loading="loading"
      :model-value="value"
      :error="error"
      :error-messages="errorMessages"
      @update:model-value="emit('change', $event)"
    />
  </div>
</template>
<style lang="less" scoped src="./categoria-dropdown.less"></style>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import type { CategoriaData } from './types/CategoriaData'
import { useHttpService } from '@/services/http/http-service'
import type { ResponseApiT } from '@/types/api/ResponseApi'
import type { CategoriaDropdownProps } from './types/CategoriaDropdownProps'

const emit = defineEmits<{
  (e: 'change', value: string | null | undefined): void
}>()

const props = withDefaults(defineProps<CategoriaDropdownProps>(), {
  label: 'Categorias',
  density: 'comfortable',
  placeholder: ''
})

const categorias = ref<CategoriaData[]>([])

const httpService = useHttpService('categorias')

const loading = ref(false)

onBeforeMount(() => {
  loading.value = true
  httpService
    .get<ResponseApiT<CategoriaData[]>>('')
    .then(({ data }) => (categorias.value = data.data))
    .catch((err) => console.error('Erro ao tentar recuperar categorias', err))
    .finally(() => (loading.value = false))
})
</script>
