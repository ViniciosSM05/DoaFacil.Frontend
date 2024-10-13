<template>
  <div class="home-filtro">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              label="Buscar anúncios"
              outlined
              class="mx-2"
              color="primary"
              prepend-inner-icon="mdi-magnify"
              :style="{ width: '100%' }"
            ></v-text-field>
          </v-col>
          <v-col>
            <CategoriaDropdown density="default" placeholder="Todas as categorias" />
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

const applyFilters = () => {
  // Lógica para aplicar filtros nos anúncios
  console.log('Filtros aplicados')
}
</script>
