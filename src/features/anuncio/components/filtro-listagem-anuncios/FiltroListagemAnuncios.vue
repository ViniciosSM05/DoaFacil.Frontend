<template>
  <div class="filtro-listagem-anuncios d-flex align-center justify-space-between">
    <v-row>
      <v-col md="3">
        <v-text-field
          v-model="store.state.filtro.search"
          color="primary"
          density="comfortable"
          label="Buscar anúncio"
          prepend-inner-icon="mdi-magnify"
          class="mr-3"
        />
      </v-col>
      <v-col md="3">
        <v-select
          v-model="store.state.filtro.data"
          color="primary"
          density="comfortable"
          :items="FILTRO_DATA_OPTIONS"
          item-value="id"
          item-title="text"
          placeholder="Selecione a data"
          class="mr-3"
        />
      </v-col>
      <v-col md="3">
        <CategoriaDropdown
          density="comfortable"
          :value="store.state.filtro.categoriaId"
          @change="store.setFiltroCategoriaId($event ?? null)"
        />
      </v-col>
      <v-col md="3">
        <v-btn
          @click="store.limparFiltros"
          color="secondary"
          outlined
          class="d-flex align-center btn-limpar-filtros"
        >
          <v-icon start class="mr-1">mdi-trash-can-outline</v-icon>
          Limpar Filtros
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="less" scoped src="./filtro-listagem-anuncios.less"></style>

<script setup lang="ts">
import CategoriaDropdown from '@/components/categoria-dropdown/CategoriaDropdown.vue'
import { useAnuncioListagemStore } from '../../store/anuncio-listagem-store'
import { EnumFiltroData } from '@/enums/filtro/EnumFiltroData'

const store = useAnuncioListagemStore()

const FILTRO_DATA_OPTIONS = [
  { id: EnumFiltroData.Qualquer, text: 'Qualquer data' },
  { id: EnumFiltroData.Hoje, text: 'Hoje' },
  { id: EnumFiltroData.EstaSemana, text: 'Esta semana' },
  { id: EnumFiltroData.EsteMes, text: 'Este mês' },
  { id: EnumFiltroData.EsteAno, text: 'Este ano' }
]
</script>
