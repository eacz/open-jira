import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
      dark: red.A700,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#3f1481',
        },
      },
    },
  },
})

export default darkTheme
