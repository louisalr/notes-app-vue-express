<template>
    <base-card>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" v-model="note.title">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" class="form-control" id="description" v-model="note.informations">
        </div>
        <div class="mb-3 form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="note.isFavorite">
            <label class="form-check-label" for="flexSwitchCheckChecked">Favori</label>
        </div>
        <div class="mb-3">
            <label for="dueDate" class="form-label">Due date</label>
            <input type="text" class="form-control" id="dueDate" v-model="note.dueDate">
        </div>
        <button @click="submitChanges" class="btn btn-info"> Validate changes</button>
    </base-card>
</template>

<script setup>

import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import { useNoteStore } from '@/stores/notes'

const storeNotes = useNoteStore()
const route = useRoute()

const note = ref({
    id: null,
    title: '',
    informations: '',
    isFavorite: false,
    dueDate: ''
})

/*
const note = computed(() => {
    return storeNotes.getNote(route.params.id)
});*/

// Faudrait get un object pré-fait de la note en cours


//const loadData = await storeNotes.


// Function
const submitChanges = () => {
    console.log(note.value.id);
  storeNotes.editNote(route.params.id, note.value.title, note.value.informations, note.value.isFavorite, note.value.dueDate);
};


const fetchNoteData = async () => {
      try {
        const data = await storeNotes.fetchNote(route.params.id);
        note.value = data;
      } catch (error) {
        console.error(error);
      }
};

onMounted(() =>{
    fetchNoteData()
})


//console.log(await (async() => storeNotes.fetchNote(route.params.id))())


</script>