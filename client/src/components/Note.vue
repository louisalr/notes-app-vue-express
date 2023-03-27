<template>
    <div @click="" class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5> <small>{{dueDate}}</small>
            <p class="card-text">{{informations}}</p>
            <router-link to="/test" class="btn btn-success"><a> Test</a></router-link>
            <router-link :to="dynamicUrl" class="btn btn-danger"><a> Delete</a></router-link>
    </div>
</div>
</template>

<script setup>
import {computed} from 'vue'
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
const dynamicUrl = computed(() => `/note/${props.id}/edit`)
</script>

<style scoped>

</style>