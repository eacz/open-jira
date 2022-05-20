import { useContext } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { UIContext } from '../../context/ui'

const Navbar = () => {
  const { openSideMenu } = useContext(UIContext)
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton onClick={openSideMenu} size='large' edge='start'>
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant='h6'>Open Jira</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
