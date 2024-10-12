<template>
  <div class="layout-authenticated">
    <NavBar />
    <main class="centered main-content">
      <RouterView />
    </main>
  </div>
</template>
<style lang="less" scoped src="./layout-authenticated.less"></style>

<script setup lang="ts">
import NavBar from '../navbar/NavBar.vue'
</script>
