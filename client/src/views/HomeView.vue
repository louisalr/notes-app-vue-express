<template>
  <div class="container">
    <Note 
      v-for="note in notes" 
      :key="note.id"
      :id="note.id"
      :title="note.title"
      :informations="note.informations"
      :isFavorite="note.isFavorite"
      :dueDate="note.dueDate"
    />
  </div>
</template>


<script setup>
import Note from '../components/Note.vue'

const notes = [
{
    id: 1,
    title: 'My first note',
    informations: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor risus vitae lorem tempus, vitae suscipit libero iaculis.',
    isFavorite: 0,
    created: "2023-03-26T11:12:23.000Z",
    dueDate: null
  },
  {
    id: 2,
    title: 'My second note',
    informations: 'Aenean non vestibulum diam.',
    isFavorite: 1,
    created: "2023-03-26T11:12:23.000Z",
    dueDate: "2023-04-24T22:00:00.000Z"
  },
  {
    id: 3,
    title: 'My third note',
    informations: 'Nullam at purus faucibus, consequat velit sed, commodo elit.',
    isFavorite: 1,
    created: "2023-03-26T11:12:27.000Z",
    dueDate: "2023-06-14T22:00:00.000Z"
  },
  {
    id: 4,
    title: 'Fourth note',
    informations: 'Quick lorem ipsum',
    isFavorite: 1,
    created: "2023-03-26T11:29:06.000Z",
    dueDate: null
  },
]
</script>