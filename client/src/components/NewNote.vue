<template>
    <base-card>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" v-model="title">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" class="form-control" id="description" v-model="description">
        </div>
        <div class="mb-3 form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="isFavorite">
            <label class="form-check-label" for="flexSwitchCheckChecked">Favori</label>
        </div>
        <div class="mb-3">
            <label for="dueDate" class="form-label">Due date</label>
            <input type="text" class="form-control" id="dueDate" v-model="dueDate">
        </div>
        <button @click="createNote" class="btn btn-info">Submit</button>
    </base-card>
</template>


<script setup>
import { useNoteStore } from '@/stores/notes'
const storeNotes = useNoteStore()

let title = ''
let description = ''
let isFavorite = true
let dueDate =  ''

const createNote = () => storeNotes.createNote(title, description, isFavorite, dueDate)

</script>