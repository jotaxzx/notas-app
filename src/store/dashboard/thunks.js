import { async } from "@firebase/util";
import { DomainVerification, Merge } from "@mui/icons-material";
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { useFileUpload } from "../../hooks/useFileUpload";
import { addNewNote, deleteNoteId, savingNewNote, setActiveNote, setNote, setPhotoToActiveNote, setSaving, updateNote } from "./dashboardSlice";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            description: '',
            date: new Date().getTime(),
            imageUrl: []
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/dashboard/notes`));
        await setDoc(newDoc, newNote);
        console.log({ newDoc });

        newNote.id = newDoc.id; // le asigno el id de la nueva nota a mi objeto newNote
        dispatch(addNewNote(newNote));// agregar la nota a la lista de notas del user
        dispatch(setActiveNote(newNote)); // nota activa que se ve en el momento
        // dispatch(setNote( newNote ))
    }
}

export const loadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const collectionRef = collection(FirebaseDB, `${uid}/dashboard/notes`);
        const notes = await getDocs(collectionRef);
        // console.log(notes); 

        const arrayNotes = [];
        notes.forEach(doc => {
            arrayNotes.push({ id: doc.id, ...doc.data() })
        })
        
        dispatch(setNote(arrayNotes))
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;// necesito el uid para mandarlo en el path
        const { active:note } = getState().dashboard; // necesito el active para desestructurar el id de la nota
        const { id } = note; // desestructuro el id de la nota para mandarla en el path

        const noteToFireStore = { ...note } // creo una nueva nota referencia para poder eliminar el id de la nota 
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/dashboard/notes/${id}`);
        //firestore setea un id automatico a las notas cuando haces setDoc
        await updateDoc(docRef, noteToFireStore)
        /* await setDoc(docRef, noteToFireStore) */
       
        dispatch(updateNote(note)); 

    }
}

export const startUploadingFiles = (files) => {
    return async(dispatch) => {
        dispatch(setSaving())

        // console.log(files);
        // esto me entregara el url de la imagen que debo almacenar
        // await useFileUpload(files[0])
        // para subir mas de 1 archivo
        const filesPromises = [];
        Array.from(files).forEach(file => {
            filesPromises.push( useFileUpload(file) )
        })


        const photosUrls = await Promise.all( filesPromises );
        console.log(photosUrls);

        dispatch(setPhotoToActiveNote( photosUrls ))
        
    }
}

export const startDeletingNote = ( ) =>{
    return async(dispatch, getState)=>{
        const { uid } = getState().auth;
        const { active:note } = getState().dashboard;

        console.log({uid, note});

        const docRef = doc(FirebaseDB, `${uid}/dashboard/notes/${note.id}`);

        // para eliminar...
        await deleteDoc(docRef);

        dispatch(deleteNoteId(note.id));

        

    }
}