import { Grid, Typography } from "@mui/material"
import Fondo from '../../assets/fondo.jpg'


export const AuthLayout = ({children, title}) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main'}}
        >

            <Grid item
                xs={3}
                sx={{
                    width: { sm: 400 },
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2
                }}
            >
                <Typography variant='h5' sx={{ mb: 1, textAlign: 'center' }}>{title}</Typography>

                {children}

            </Grid>
        </Grid>
    )
}
