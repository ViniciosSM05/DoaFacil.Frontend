<template>
  <div class="home-filtro">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="store.state.filtro.search"
              label="Buscar anúncios"
              outlined
              class="mx-2"
              color="primary"
              prepend-inner-icon="mdi-magnify"
              :style="{ width: '100%' }"
            ></v-text-field>
          </v-col>
          <v-col>
            <CategoriaDropdown
              density="default"
              placeholder="Todas as categorias"
              :value="store.state.filtro.categoriaId"
              @change="store.setFiltroCategoriaId($event ?? null)"
            />
          </v-col>
          <v-col>
            <v-btn
              class="btn-buscar"
              color="primary"
              @click="applyFilters"
              :style="{ width: '100%' }"
            >
              Buscar
              <v-icon end>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<style lang="less" scoped src="./home-filtro.less"></style>

<script setup lang="ts">
import CategoriaDropdown from '@/components/categoria-dropdown/CategoriaDropdown.vue'
import { useHomeStore } from '../../store/home-store'
import { useAnuncioListagemStore } from '@/features/anuncio'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useHomeStore()
const anunciosListagemStore = useAnuncioListagemStore()

const applyFilters = () => {
  anunciosListagemStore.setFiltro({
    ...store.state.filtro,
    take: null
  })
  router.push({ name: 'anuncios' })
}
</script>
