<template>
  <div class="formatted-number-input">
    <v-text-field
      v-model="formattedValue"
      :label="label"
      class="mb-4"
      color="primary"
      @input="update"
      placeholder="0,00"
      :error="error"
      :error-messages="errorMessages"
    />
  </div>
</template>
<style scoped lang="less">
.formatted-number-input {
  width: 100%;
}
</style>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import type { FormattedNumberInputProps } from './types/FormattedNumberInputProps'

const props = withDefaults(defineProps<FormattedNumberInputProps>(), {
  label: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const formattedValue = ref('0,00')

formattedValue.value = props.modelValue.toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

watch(
  () => props.modelValue,
  (newValue) => {
    formattedValue.value = newValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
)

const update = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value

  if (inputValue.trim() === '') {
    formattedValue.value = '0,00'
    emit('update:modelValue', 0)
    return
  }

  const cleanedValue = inputValue.replace(/[^0-9]/g, '')

  const numericValue = parseFloat(cleanedValue) / 100

  emit('update:modelValue', numericValue)

  formattedValue.value = numericValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
</script>
