import { Box, IconButton, Toolbar } from "@mui/material"
import { AddOutlined } from '@mui/icons-material';
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { NothingSelected } from "../views/NothingSelected";
import { NoteView } from "../views/NoteView";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/dashboard/thunks";




export const DashboardPage = () => {

    const drawerWidth = 280;

    const dispatch = useDispatch();
    const { isSaving, active } = useSelector(state => state.dashboard);

    const NewNote = () => {
        dispatch(startNewNote())
    }

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#f6f6f6', minHeight: '100vh' }} className="animate__animated animate__fadeIn animate__bounce">

            <NavBar drawerWidth={drawerWidth} />

            <SideBar drawerWidth={drawerWidth} />

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 2}}
            >
                <Toolbar/>
                { active ? <NoteView/> : <NothingSelected /> }
                
                

                <IconButton
                    disabled={ isSaving }
                    onClick={ NewNote }
                    size='large'
                    sx={{
                        color: 'white',
                        backgroundColor: 'error.main',
                        ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                        position: 'fixed',
                        right: 50,
                        bottom: 50,
                        padding: 2
                    }}
                >
                    <AddOutlined sx={{ fontSize: 30 }} />
                </IconButton>
            </Box>
        </Box>
    )
}
