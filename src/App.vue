<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'
import { defineAxios } from './services/axios/axios.service'

onBeforeMount(() => defineAxios())
</script>

<template>
  <RouterView />
</template>
