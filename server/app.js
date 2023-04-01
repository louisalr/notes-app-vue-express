import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { getNotes, getNotesWithDueDate, getNote, createNote, editNote,deleteNote} from './database.js'
const app = express()


const corsOptions = {
    origin: 'http://localhost:5173',
};
  
app.use(cors(corsOptions));
  

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
    console.log(req.body)
    const note = await createNote(title, informations, isFavorite, dueDate)
    res.status(201).send(note)
})

app.patch('/notes/:id', async(req,res)=>{
    // Get the id from the request parameters
    const {id} = req.params
    // Get the data from the json body
    const {title, informations, isFavorite, dueDate} = req.body
    const note_edit = await editNote(id, title, informations, isFavorite, dueDate)
    res.status(201).send(note_edit)
})


app.delete('/notes/:id', async(req,res) =>{
    const {id} = req.params
    const note_delete = await deleteNote(id);
    res.status(201).send(note_delete)
})

app.use((err, req, res, next)=>{
    console.log(err.stack)
    res.status(500).send('Something broke')
})


app.listen(9000, () =>{
    console.log("Server is running on port 9000")
})
