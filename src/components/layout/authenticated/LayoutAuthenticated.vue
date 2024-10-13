<template>
  <div class="layout-authenticated" :style="{ backgroundColor }">
    <NavBar />
    <main class="centered main-content">
      <RouterView />
    </main>
  </div>
</template>
<style lang="less" scoped src="./layout-authenticated.less"></style>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import NavBar from '../navbar/NavBar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const backgroundColor = ref('#FFFFFF')

const setBackgroundColor = () =>
  (backgroundColor.value = (route.meta.backgroundColor as string) || '#FFFFFF')

watch(
  () => route.meta.backgroundColor,
  () => setBackgroundColor()
)
onMounted(() => setBackgroundColor())
</script>
