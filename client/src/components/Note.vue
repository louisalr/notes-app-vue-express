<template>
    <base-card>
    <router-link :to="dynamicUrlEdit">
        <div class="card-body" @click="">
            <h5 class="card-title">{{title}}</h5> <small v-if="dueDate" class="date">{{formatDate}}</small>
            <p class="card-text">{{informations}}</p>
            
            <button @click="toggleFavoriteState" class="btn btn-warning">
                <i v-if="isFavorite" class="fas fa-heart"></i>
                <i v-else class="far fa-heart"></i>
            </button>

            <button @click="handleDeleteButton" class="btn btn-danger"><i class="fa fa-trash"></i> </button>
        </div>
        </router-link>
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
        type: String,
    }
})

// Computed 
const dynamicUrlEdit = computed(() => `/note/${props.id}/edit`)

const formatDate = computed(() => {
    const date = new Date(props.dueDate)
    const day = date.getDate()
    const month = date.toLocaleString('default', {month: 'long'})
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
})

// Emit 
const emit = defineEmits(['deleteClick'])

// Function
const handleDeleteButton = () => {
    emit('deleteClick', props.id)
}

const toggleFavoriteState = () => storeNotes.toggleFavorite(props.id, props.isFavorite)


</script>

<style scoped>
.date{
    color: grey;
}

a:link {
    color: inherit;
    text-decoration: none; 
}

a:visited { 
    color: inherit;
    text-decoration: none; 
}

a:hover {
    color: inherit;
    text-decoration: none; 
}

a:active { 
    color: inherit;
    text-decoration: none; 
}


</style>