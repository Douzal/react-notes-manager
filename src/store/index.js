import { configureStore } from '@reduxjs/toolkit';
import { noteSlice, noteReducer } from './note/note-slice.js';

export const store = configureStore({
  reducer: {
    NOTE: noteReducer, // noteSlice.reducer
  }
})