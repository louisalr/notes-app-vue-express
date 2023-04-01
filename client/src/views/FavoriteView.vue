<template>
  <div class="about">
    <NoteVue
      v-for="(value) in favoriteNotes" 
      @deleteClick="deleteNote"
      :key="value.id"
      :id="value.id"
      :title="value.title"
      :informations="value.informations"
      :isFavorite="value.isFavorite"
      :dueDate="value.dueDate"
    />
  </div>
</template>

<script setup>
import {onMounted, computed, ref } from 'vue';
import NoteVue from '../components/Note.vue';
import { useNoteStore } from '@/stores/notes'

const storeNotes = useNoteStore()

// Computed
const favoriteNotes = computed(() => storeNotes.getNoteFavorite)

onMounted(() =>{
  console.log('test')
  //storeNotes.fetchNotes()
})

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
