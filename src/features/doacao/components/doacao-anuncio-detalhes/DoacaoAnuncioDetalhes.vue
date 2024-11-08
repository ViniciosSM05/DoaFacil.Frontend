<template>
  <div class="doacao-anuncio-detalhes">
    <v-card class="pa-4 container-card d-flex flex-column align-center">
      <v-progress-linear
        :model-value="progress"
        color="primary"
        height="8"
        class="mb-4"
      ></v-progress-linear>
      <div class="text-h6 font-weight-bold mb-2">
        {{ formatCurrency(doado) }} / {{ formatCurrency(meta) }}
      </div>
      <div class="text-body-2 mb-2">
        Apoiadores: <strong>{{ apoiadores }}</strong>
      </div>
      <div class="text-body-1 primary--text mb-4"><span>Chave pix:</span> {{ pix }}</div>
      <FormattedNumberInput
        v-model="store.state.valor"
        label="Quero ajudar"
        color="primary"
        :error="hasError('Valor')"
        :error-messages="getErrorMessages('Valor')"
      />
      <v-btn color="primary" class="btn-doar text-h5" @click="doar"> DOAR </v-btn>
      <v-divider class="line my-4" />
      <div class="d-flex align-center">
        <v-avatar size="40" color="primary" class="mr-2">{{ inicialAnunciante }}</v-avatar>
        <span class="text-subtitle-2">{{ anunciante }}</span>
      </div>
    </v-card>
  </div>
</template>
<style lang="less" scoped src="./doacao-anuncio-detalhes.less"></style>

<script setup lang="ts">
import { formatCurrency } from '@/utils/currency.utils'
import { computed } from 'vue'
import { useDoacaoStore } from '../../store/doacao-store'
import { useErrorFiedService } from '@/services/error-field/error-field-service'
import { useNotificationStore } from '@/stores/notification/notification-store'
import type { DoacaoAnuncioDetalhesProps } from '../../types/DoacaoAnuncioDetalhesProps'
import FormattedNumberInput from '@/components/formatted-number-input/FormattedNumberInput.vue'

const props = defineProps<DoacaoAnuncioDetalhesProps>()
const store = useDoacaoStore()
const notificationStore = useNotificationStore()
const { getErrorMessages, hasError } = useErrorFiedService(() => store.state.errors)

const progress = computed(() => Math.min((props.doado / props.meta) * 100, 100))
const inicialAnunciante = computed(() => props.anunciante.slice(0, 2).toUpperCase())

const doar = () => {
  store.doar(
    () => {
      notificationStore.showNotificationSuccess('Doação realizada com sucesso!!!')
      const anuncioId = store.state.anuncio.id
      store.destroy()
      store.init(anuncioId)
    },
    () => notificationStore.showNotificationError('Ops, houve um erro!')
  )
}
</script>
