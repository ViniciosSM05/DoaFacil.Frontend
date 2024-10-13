<template>
  <div class="listagem-anuncios-view">
    <v-container>
      <v-row>
        <v-col md="12" class="mb-10 d-flex align-center justify-center">
          <h1 class="explorar-title text-h5">Explore os Anúncios</h1>
        </v-col>
      </v-row>

      <FiltroListagemAnuncios />

      <ListagemAnuncios :ads="filteredAds" />
    </v-container>
  </div>
</template>
<style lang="less" scoped src="./listagem-anuncios-view.less"></style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { FiltroListagemAnuncios, ListagemAnuncios, type CardAnuncioProps } from '@/features/anuncio'

const ads = ref<CardAnuncioProps[]>([
  {
    id: '1',
    img: 'https://undraw.co/api/image/random',
    titulo: 'Ajude Maria a construir seu futuro',
    nomeCategoria: 'Educação',
    codigo: 1,
    anunciante: 'Maria Silva',
    meta: 5000,
    doado: 1200
  },
  {
    id: '2',
    img: 'https://undraw.co/api/image/random',
    titulo: 'Apoie o tratamento de João',
    nomeCategoria: 'Saúde',
    codigo: 2,
    anunciante: 'João Ferreira',
    meta: 15000,
    doado: 8500
  },
  {
    id: '3',
    img: 'https://undraw.co/api/image/random',
    titulo: 'Doe para o projeto social de Paulo',
    nomeCategoria: 'Comunidade',
    codigo: 3,
    anunciante: 'Paulo Souza',
    meta: 8000,
    doado: 3000
  },
  {
    id: '4',
    img: 'https://undraw.co/api/image/random',
    titulo: 'Ajude na construção do abrigo para animais',
    nomeCategoria: 'Animais',
    codigo: 4,
    anunciante: 'Carla Mendes',
    meta: 10000,
    doado: 2500
  },
  {
    id: '5',
    img: 'https://undraw.co/api/image/random',
    titulo: 'Viagem de estudos para Londres',
    nomeCategoria: 'Educação',
    codigo: 5,
    anunciante: 'Lucas Oliveira',
    meta: 20000,
    doado: 5000
  },
  {
    id: '6',
    img: 'https://undraw.co/api/image/random',
    titulo: 'Tratamento de saúde para Pedro',
    nomeCategoria: 'Saúde',
    codigo: 6,
    anunciante: 'Ana Costa',
    meta: 12000,
    doado: 6000
  },
  {
    id: '7',
    img: 'https://undraw.co/api/image/random',
    titulo: 'Equipamentos para time de futebol comunitário',
    nomeCategoria: 'Esportes',
    codigo: 7,
    anunciante: 'Renato Silva',
    meta: 8000,
    doado: 3000
  },
  {
    id: '8',
    img: 'https://undraw.co/api/image/random',
    titulo: 'Produção de curta-metragem independente',
    nomeCategoria: 'Cultura',
    codigo: 8,
    anunciante: 'Julia Santos',
    meta: 15000,
    doado: 7500
  },
  {
    id: '9',
    img: 'https://undraw.co/api/image/random',
    titulo: 'Reforma da creche comunitária',
    nomeCategoria: 'Comunidade',
    codigo: 9,
    anunciante: 'Fernando Nunes',
    meta: 25000,
    doado: 10000
  },
  {
    id: '10',
    img: 'https://undraw.co/api/image/random',
    titulo: 'Compra de cadeira de rodas para Guilherme',
    nomeCategoria: 'Saúde',
    codigo: 10,
    anunciante: 'Gabriela Rocha',
    meta: 7000,
    doado: 4500
  },
  {
    id: '11',
    img: 'https://undraw.co/api/image/random',
    titulo: 'Festival de música local',
    nomeCategoria: 'Cultura',
    codigo: 11,
    anunciante: 'Pedro Maia',
    meta: 18000,
    doado: 9000
  }
])

const searchQuery = ref('')
const selectedDateRange = ref<string | null>(null)

// Computed property para filtrar anúncios
const filteredAds = computed(() => {
  return ads.value.filter((ad) => {
    return ad.titulo.toLowerCase().includes(searchQuery.value.toLowerCase()) && matchesDateRange(ad)
  })
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleDateRange = (range: string) => {
  selectedDateRange.value = range
}

const handleClearFilters = () => {
  searchQuery.value = ''
  selectedDateRange.value = null
}

// Função para validar o range de data (apenas como exemplo, implementar a lógica de datas conforme necessário)
const matchesDateRange = (ad: CardAnuncioProps) => {
  if (!selectedDateRange.value || selectedDateRange.value === 'Qualquer data') {
    return true
  }
  // Adicione a lógica de filtragem de data aqui conforme necessário
  return true
}
</script>
