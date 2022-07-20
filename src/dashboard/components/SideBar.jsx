import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { TurnedInNot } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from "../../store/dashboard/dashboardSlice";
import { useMemo } from "react";

export const SideBar = ({ drawerWidth }) => {

    const dispatch = useDispatch();

    const { displayName } = useSelector(state => state.auth)
    const { notes } = useSelector(state => state.dashboard)

    const onClickActive = ({ id, title, date, description, imageUrl }) => {
        dispatch(setActiveNote({ id, title, date, description, imageUrl }))
    }


    const dateFormat = (date) => {
        const newDate = new Date(date);

        return newDate.toLocaleString('en-GB', { timeZone: 'UTC' }).substring(0,10)
    }

    const capitalize = (displayName) => {
        const newName = displayName.charAt().toUpperCase() + displayName.slice(1)
        return newName
    }


    return (
        <Box
            component='nav'

            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                color="blue"
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#89e2c7' }
                }}

            >
                <Toolbar>
                    <Typography variant='h6' color="white" noWrap component='div'>
                        {capitalize(displayName)}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        // onClick={ dispatch(setActiveNote({id, title, date, description, imageUrl}))}
                        notes.map(({ id, title, date, description, imageUrl = [] }) => (
                            <ListItem key={id} disablePadding  >
                                <ListItemButton onClick={() => onClickActive({ id, title, date, description, imageUrl })}>
                                    <ListItemIcon>
                                        <TurnedInNot sx={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <Grid container sx={{display: 'flex', flexDirection: 'column'}} >
                                        <ListItemText primary={title?.length > 15 ? title.substring(0, 15) + '...' : title} sx={{ color: 'white' }} />
                                        <ListItemText primary={dateFormat(date)} sx={{ color: 'inherit', textAlign: 'left' }} />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}
