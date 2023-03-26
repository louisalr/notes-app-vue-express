import express from 'express'
import bodyParser from 'body-parser'
import { getNotes, getNotesWithDueDate, getNote, createNote} from './database.js'
const app = express()

app.use(bodyParser.json())

app.get('/notes', async (req, res)=>{
    const notes = await getNotes()
    res.send(notes)
})

app.get('/notes-due', async (req,res)=>{
    const notes = await getNotesWithDueDate()
    res.send(notes)
})

app.get('/notes/:id', async (req,res) =>{
    const {id} = req.params
    const note = await getNote(id)
    res.send(note)
})


app.post('/notes', async (req,res) =>{
    const {title, informations, isFavorite, dueDate} = req.body
    const note = await createNote(title, informations, isFavorite, dueDate)
    res.status(201).send(note)
})

/*
app.delete('/notes/:id', async(req,res) =>{
    const delete = await deleteNode
})*/

app.use((err, req, res, next)=>{
    console.log(err.stack)
    res.status(500).send('Something broke')
})


app.listen(9000, () =>{
    console.log("Server is running on port 9000")
})
