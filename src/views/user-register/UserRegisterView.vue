<template>
  <div class="user-register-view">
    <v-row align="center">
      <v-col md="7" class="col-form" align-self="center">
        <UserRegisterForm />
      </v-col>
      <v-col md="5">
        <v-row justify="center"><img src="@/assets/svg/user_register_love.svg" /></v-row>
      </v-col>
    </v-row>
  </div>
</template>
<style scoped lang="less" src="./user-register-view.less"></style>

<script setup lang="ts">
import { UserRegisterForm } from '@/features/register/'
</script>
