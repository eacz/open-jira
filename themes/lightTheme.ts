import { createTheme } from '@mui/material'
import { grey, red } from '@mui/material/colors'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: grey[300],
    },
    primary: {
      main: '#4A148C',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
})

export default lightTheme
