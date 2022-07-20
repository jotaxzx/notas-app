import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { useRef } from 'react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useForm } from '../../hooks';
import { setActiveNote } from '../../store/dashboard/dashboardSlice';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/dashboard/thunks';
import { ImageGallery } from '../components/ImageGallery';



export const NoteView = () => {

    const dispatch = useDispatch();

    const { active, messageSaved } = useSelector(state => state.dashboard)

    const { title, description, date, onInputChange, formState } = useForm(active);

    const dateFormat = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
        // return newDate.toLocaleString('en-GB', { timeZone: 'UTC' })
    }, [date])

    // const dateFormat2 = useMemo(() => {
    //     const newDate = new Date(date);

    //     return newDate.toLocaleString('en-GB', { timeZone: 'UTC' })
    // }, [date])

    const fileInputRef = useRef();

    

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState]);

    useEffect(() => {
       
        if (messageSaved === "actualizado") {
            Swal.fire({
                title: 'Acción exitosa',
                icon: 'success'
            });
        }

    }, [messageSaved]);

   

   

    const saveNote = () => {
        dispatch(startSaveNote());
    }

    const onInputFileChange = ({ target }) => {
        if (target.files === 0) {
            return;
        } else {
            dispatch(startUploadingFiles(target.files))
        }
    }

    const onDelete = () => {
        dispatch(startDeletingNote())
                   
      setTimeout(() => {
          Swal.fire({
              title: 'Nota borrada',
              icon: 'success'
          });
        
      }, 300);
        
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1, padding: 5 }} className="animate__animated animate__fadeIn animate__bounce">
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateFormat}</Typography>
            </Grid>
            <Grid item>
                <input type="file" style={{ display: 'none' }} multiple onChange={onInputFileChange} ref={fileInputRef} />
                <Tooltip title="subida de archivos">
                    <IconButton
                        color="primary"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <UploadOutlined />
                    </IconButton>
                </Tooltip>

                <Button
                    onClick={saveNote}
                    color="primary"
                    sx={{ padding: 2 }}

                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="standard"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    name="title"
                    value={title}
                    onChange={onInputChange}

                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField
                    type="text"
                    variant="standard"
                    label="Descripcion"
                    fullWidth
                    multiline
                    name="description"
                    value={description}
                    onChange={onInputChange}
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={5}
                />
            </Grid>

            <Grid container>
                <Button onClick={onDelete} sx={{ mt: 4 }} color="error">
                    <DeleteOutline />
                    Borrar
                </Button>

            </Grid>

            {/* Image gallery */}
            <ImageGallery images={active.imageUrl} />

        </Grid>
    )
}
