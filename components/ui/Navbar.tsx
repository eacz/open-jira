import { useContext } from 'react'
import NextLink from 'next/link'
import { AppBar, IconButton, Toolbar, Typography, Link } from '@mui/material'
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
        <NextLink style={{ textDecoration: 'none', color: 'white' }} href={'/'} passHref>
          <Typography variant='h6'>Open Jira</Typography>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
