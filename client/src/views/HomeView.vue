<template>
  <div class="container">
    <NewNote/>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" id="showOnlyFavorite" v-model="favoriteToggle" @input="test">
      <label class="form-check-label" for="flexSwitchCheckDefault">{{showOnlyFavorite}}</label>
    </div>
    <NoteVue
      v-for="(value) in notes" 
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
import { useNoteStore } from '@/stores/notes'
import NewNote from '../components/NewNote.vue';
import NoteVue from '../components/Note.vue';

const storeNotes = useNoteStore()
const favoriteToggle= ref(false)


// Computed
const notes = computed((value) => {
  console.log(value)
  console.log('Dans le home' + storeNotes.notes)
  return storeNotes.notes;
});

const showOnlyFavorite = computed(() => 
  favoriteToggle.value ? 'Favorite only' : 'Everything'
)


// Function to delete the note
const deleteNote = (id) => storeNotes.deleteNote(id)

// Manage the displayed notes
const test = () => {
  console.log(storeNotes.getNoteWithDueDate)
  return storeNotes.getNoteWithDueDate
}

onMounted(() =>{
  storeNotes.fetchNotes()
})

</script>