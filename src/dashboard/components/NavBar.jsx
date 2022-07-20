import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux'
import { startLogout } from "../../store/auth/thunks";


export const NavBar = ({ drawerWidth }) => {

    const dispatch = useDispatch();
    return (
        <AppBar
            position='fixed'
            color="primary"
            sx={{
                width: {
                    sm: `calc(100% - ${drawerWidth}px)`,
                    
                },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' color="white" noWrap component='div'> Notas - App </Typography>

                    <IconButton
                     color='error'
                     onClick={()=> (dispatch(startLogout()))}
                     >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
