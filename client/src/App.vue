<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <RouterLink to="/">All notes</RouterLink>
        <RouterLink to="/favorite">Favorites</RouterLink>
      </nav>
  </div>

  <RouterView />
</template>

<style scoped>
</style>
