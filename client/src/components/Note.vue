<template>
    <base-card>
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5> <small>{{dueDate}}</small>
            <p class="card-text">{{informations}}</p>
            <router-link :to="dynamicUrlEdit" class="btn btn-success"><a> Edit</a></router-link>
            <button @click="handleDeleteButton" class="btn btn-danger"> Delete </button>
            <button @click="toggleFavoriteState" class="btn btn-warning">
                <i v-if="isFavorite" class="fas fa-heart"></i>
                <i v-else class="far fa-heart"></i>
            </button>
            <!--CHANGER LA CLASSE DYNAMIQUEMENT-->
        </div>
    </base-card>
</template>

<script setup>
import {computed} from 'vue'
import { useNoteStore } from '@/stores/notes'

const storeNotes = useNoteStore()

// Props
const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    informations:{
        type: String,
        required: true
    },
    isFavorite:{
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
})

// Computed 
const dynamicUrlEdit = computed(() => `/note/${props.id}/edit`)

// Emit 
const emit = defineEmits(['deleteClick'])

// Function
const handleDeleteButton = () => {
    emit('deleteClick', props.id)
}

const toggleFavoriteState = () => storeNotes.toggleFavorite(props.id, props.isFavorite)


</script>

<style scoped>

</style>