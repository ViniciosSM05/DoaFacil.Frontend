<template>
  <div class="uf-dropdown">
    <v-autocomplete
      color="primary"
      density="comfortable"
      :label="label"
      :item-value="'id'"
      :item-title="'nome'"
      :items="ufs"
      :loading="loading"
      :model-value="value"
      :error="error"
      :error-messages="errorMessages"
      @update:model-value="emit('change', $event)"
    />
  </div>
</template>
<style lang="less" scoped src="./uf-dropdown.less"></style>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useHttpService } from '@/services/http/http-service'
import type { ResponseApiT } from '@/types/api/ResponseApi'
import type { UfData } from '@/components/uf-dropdown/types/UfData'
import type { UfDropdownProps } from './types/UfDropdownProps'
import type { UfDropdownExpose } from './types/UfDropdownExpose'

const emit = defineEmits<{
  (e: 'change', value: string | null | undefined): void
}>()

const props = withDefaults(defineProps<UfDropdownProps>(), {
  label: 'Estado'
})

const httpService = useHttpService('ufs')

const ufs = ref<UfData[]>([])

const loading = ref(false)

onBeforeMount(() => {
  loading.value = true
  httpService
    .get<ResponseApiT<UfData[]>>('')
    .then(({ data }) => (ufs.value = data.data))
    .catch((err) => console.error('Erro ao tentar recuperar ufs', err))
    .finally(() => (loading.value = false))
})

defineExpose<UfDropdownExpose>({
  getUfs: () => [...ufs.value]
})
</script>
