<template>
  <div class="cidade-dropdown">
    <v-autocomplete
      density="comfortable"
      color="primary"
      :disabled="disabled"
      :label="label"
      :items="cidades"
      :loading="loading"
      :model-value="value"
      :error="error"
      :error-messages="errorMessages"
      @update:model-value="emit('change', $event)"
    />
  </div>
</template>
<style lang="less" scoped src="./cidade-dropdown.less"></style>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import type { CidadeDropdownProps } from './types/CidadeDropdownProps'
import type { CidadeData } from './types/CidadeData'
import { distinctBy } from '@/utils/array.utils'

const URL_IBGE_BY_UF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/{uf}/distritos'
const emit = defineEmits<{
  (e: 'change', value: string | null | undefined): void
}>()

const props = withDefaults(defineProps<CidadeDropdownProps>(), {
  label: 'Cidade'
})

const cidades = ref<string[]>([])

const loading = ref(false)

const refresh = () => {
  if (!props.uf) {
    cidades.value = []
    return
  }

  loading.value = true
  fetch(URL_IBGE_BY_UF.replace('{uf}', props.uf ?? ''))
    .then((r) => r.json())
    .then(
      (data: CidadeData[]) =>
        (cidades.value = distinctBy(data, (x) => x.municipio.nome).map((x) => x.municipio.nome))
    )
    .catch((err) => console.error('Erro ao tentar recuperar municípios', err))
    .finally(() => (loading.value = false))
}

watch(
  () => props.uf,
  () => refresh()
)

onBeforeMount(() => refresh())
</script>
