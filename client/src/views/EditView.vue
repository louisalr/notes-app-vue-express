<template>
    <base-card>
        <div v-if="storeNotes.isLoading">
            <base-spinner></base-spinner>
        </div>
        <div v-else>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" v-model="note.title">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" v-model="note.informations" rows="4"></textarea>
            </div>
            <div class="mb-3 form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="note.isFavorite">
                <label class="form-check-label" for="flexSwitchCheckChecked">Favori</label>
            </div>
            <div class="mb-3">
                <label for="dueDate" class="form-label">Due date</label>
                <input type="datetime-local" class="form-control" id="dueDate" v-model="note.dueDate">
            </div>
            <button @click="submitChanges" class="btn btn-info"> Validate changes</button>
        </div>
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


// Function
const submitChanges = () => {
    console.log(note.value.id);
  storeNotes.editNote(route.params.id, note.value.title, note.value.informations, note.value.isFavorite, note.value.dueDate);
};


const fetchNoteData = async () => {
    storeNotes.isLoading = true
    try {
        const data = await storeNotes.fetchNote(route.params.id);
        note.value = data;
    }catch (error) {
        console.error(error);
    }
    storeNotes.isLoading = false
};

onMounted(() =>{
    fetchNoteData()
})

</script>