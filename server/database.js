import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

export async function getNotes(){
    const [rows] = await pool.query("SELECT * from notes")
    return rows
}

export async function getNotesWithDueDate(){
    const [rows] = await pool.query("SELECT * from notes where dueDate IS NOT NULL")
    return rows
}

export async function getNote(id){
    const [rows] = await pool.query(`SELECT * from notes where id = ?`, [id])
    return rows[0]
}


export async function createNote(title, informations, isFavorite, dueDate){
    const date = dueDate == "" ? null : dueDate
    const [result] = await pool.query(`INSERT INTO notes (title, informations, isFavorite, dueDate) VALUES (?,?,?,?)`, 
    [title, informations, isFavorite, date])

    const id = result.insertId
    return getNote(id)
}

export async function editNote(id, title, informations, isFavorite, dueDate){
    const [rows] = await pool.query(`UPDATE notes SET title= ?, informations = ?, isFavorite = ?, dueDate = ? where id = ?`,
    [title,informations,isFavorite, dueDate,id])
    return rows[0]
}

export async function deleteNote(id){
    const [rows] = await pool.query(`DELETE FROM notes where id = ?`, id)
    return rows 
}

/*
const deleteTest = await deleteNote(1)
console.log(deleteTest)*/

/*




const resultsSelectAll = await getNotes()
console.log(resultsSelectAll)

const resultsNoteWithDue = await getNotesWithDueDate()
console.log(resultsNoteWithDue)

const resultCreateNote = await createNote('Fourth note', 'Quick lorem ipsum', true, null)
console.log(resultCreateNote)


const resultEditNote = await editNote(1, 'Modified title note', 'Quick lorem ipsum', false, null)
console.log(resultEditNote)

const resultDeleteNote = await deleteNote()*/