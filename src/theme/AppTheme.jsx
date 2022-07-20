import { ThemeProvider } from "@mui/material"
import { CssBaseline } from "@mui/material"
import { seafoamTheme } from "./seafoamTheme"

export const AppTheme = ({children}) => {
    return (
        <ThemeProvider theme={seafoamTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}
