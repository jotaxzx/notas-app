import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';


export const seafoamTheme = createTheme({
    palette: {
        primary: {
            main: '#89e2c7'
        },
        secondary: {
            main: '#543884'
        },
        third: {
            main: '#99cc00'
        },
        error: {
            main: red.A400
        }
    }
})