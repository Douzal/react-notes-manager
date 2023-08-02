import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid';

export const noteSlice = createSlice({
    name: 'noteSlice',
    initialState: {
        noteList: [
            // { id: nanoid(4), name: 'Note 1' },
            // { id: nanoid(4), name: 'Note 2' },
            // { id: nanoid(3), name: 'Note 3' },
        ]
    },
    reducers: {
        setNoteList: (currentSlice, action) => {
            currentSlice.noteList = action.payload;
        },
        addNote: (currentSlice, action) => {
            currentSlice.noteList.push(action.payload);
        },
        updateNote: (currentSlice, action) => {
            // console.log('update',action);
            const indexToUpdate = currentSlice.noteList.findIndex((note) => {
                return (note.id ===action.payload.id);
            })
            currentSlice.noteList[indexToUpdate] = action.payload;
        },
        deleteNote : (currentSlice, action) => {
            currentSlice.noteList = currentSlice.noteList.filter(note => note.id !==action.payload.id);
        }
    }
})

export const noteReducer = noteSlice.reducer;
export const { setNoteList, addNote, updateNote, deleteNote } = noteSlice.actions;