<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6">
        <NewNote/>
      </div>

      <div class="col-lg-6">
        <base-card>
          <p> Manage displayed notes </p>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="showOnlyFavorite" v-model="favoriteToggle" @input="favoriteFilter">
            <label class="form-check-label" for="flexSwitchCheckDefault">{{showOnlyFavorite}}</label>
          </div>
        </base-card>
        <div v-if="storeNotes.isLoading">
          <base-spinner></base-spinner>
        </div>
        <div v-else>
          <NoteVue
          v-for="value in storeNotes.notes" 
          @deleteClick="deleteNote"
          :key="value.id"
          :id="value.id"
          :title="value.title"
          :informations="value.informations"
          :isFavorite="value.isFavorite"
          :dueDate="value.dueDate"
          />
        </div>
    </div>
    </div>
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
const showOnlyFavorite = computed(() => 
  favoriteToggle.value ? 'Favorite only' : 'Everything'
)


// Function to delete the note
const deleteNote = (id) => storeNotes.deleteNote(id)


// Manage the displayed notes

const favoriteFilter = () => {
  console.log(!favoriteToggle.value)
  storeNotes.getNoteWithDueDate(!favoriteToggle.value)
}

const fetchNotesData = async () => {
  storeNotes.isLoading = true
  try {
    const data = await storeNotes.fetchNotes();
  } catch (error) {
    console.error(error);
  }
  storeNotes.isLoading = false
};

onMounted(() => fetchNotesData())


</script>