<script setup>
import {RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
</script>

<template>
  <Header></Header>
  <router-view v-slot="slotProps">
      <component :is="slotProps.Component"></component>
  </router-view>

</template>

<style scoped>
</style>

