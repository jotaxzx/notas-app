import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [], // notas almacenadas en un objeto
        active: null,
        
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
            
        },
        addNewNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;

        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNote: (state, action) =>{
            state.notes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {

                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            })
            state.messageSaved = 'actualizado'
            
        },
        setPhotoToActiveNote: (state, action) => {
            state.active.imageUrl = [...state.active?.imageUrl, ...action?.payload];
            state.isSaving = false;
        },
        deleteNoteId: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
            state.active = null;
            state.messageSaved = 'borrado'
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },



    }
})

export const { savingNewNote, addNewNote, setActiveNote, setNote, setSaving, updateNote, deleteNoteId, clearNotesLogout, setPhotoToActiveNote  } = dashboardSlice.actions;