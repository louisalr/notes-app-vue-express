import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNoteStore = defineStore({
    id: 'note',
    state: () =>({
        notes: [],
        isLoading : false
    }),
    getters:{
        getNotesLength: (state) => state.notes.length,
        getNotes: (state) => state.notes,
        getNote: (state) => (id) => state.notes.find((note) => note.id == Number(id)),
        getNoteWithDueDate: (state) => state.notes.filter(note => note.dueDate != ''),
        getNoteFavorite: (state) => state.notes.filter(note => note.isFavorite == 1)
        
    },
    actions:{
        async fetchNotes(){
            const response = await fetch('http://localhost:9000/notes')
            this.notes = await response.json()
        },
        async fetchNote(id){
            console.log('Dans le fetch')
            const response = await fetch(`http://localhost:9000/notes/${id}`)
            const data = await response.json()
            return data;
        },
        async createNote(_title, _informations, _isFavorite, _dueDate ){
            const createNote = await fetch(`http://localhost:9000/notes`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: _title,
                    informations: _informations,
                    isFavorite: _isFavorite,
                    dueDate: _dueDate
                })
            })
            const responseData = await createNote.json()
            console.log(responseData)
            

            // create a new object with the received response
            const newNote = {
                id: responseData['id'],
                title: responseData['title'],
                informations: responseData['informations'],
                isFavorite: responseData['isFavorite'],
                created: responseData['created']
            }
            
            /*
            if(!responseData.ok){
                const error = new Error(
                    responseData.message || 'Failed to authenticate. Check your login data.'
                );
                throw error;
            }*/
            

            // Push the element in the array
            this.notes.push(newNote)
        },
        async editNote(id, _title, _informations, _isFavorite, _dueDate){
            console.log(_title)
            const editNoteRequest = await fetch(`http://localhost:9000/notes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: _title,
                    informations: _informations,
                    isFavorite: _isFavorite,
                    dueDate: _dueDate
                })
            })
            console.log(await editNoteRequest.json())
            const responseData = await editNoteRequest.json()
            console.log(responseData)
        },
        async toggleFavorite(id, _isFavorite){
            if(_isFavorite == 1){
                _isFavorite = true
            }
            else{
                _isFavorite = false
            }
            const editNoteRequest = await fetch(`http://localhost:9000/notes/${id}/favorite`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isFavorite: _isFavorite,
                })
            })
            //console.log(await editNoteRequest.json())
            const responseData = await editNoteRequest
            //console.log(responseData)
            // Get the index of the note we changed its favorite status and modify it
            const index = this.notes.find((note) => note.id == Number(id))        
            index.isFavorite = !index.isFavorite
            //console.log(index.isFavorite)
            index.title = 'Modification dans la requete'
            //console.log(index.isFavorite)
        },
        async deleteNote(id){
            const deleteNote = await fetch(`http://localhost:9000/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                })
            })
            const responseData = await deleteNote.status
            // If the status code is successful
            // Remove the element from the array
            if(responseData == 201){
                const index = this.notes.findIndex((note) => note.id == id)
                this.notes.splice(index, 1)
            }
            console.log(responseData)
        }
    }
})