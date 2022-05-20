import { useContext } from 'react'
import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { UIContext } from '../../context/ui'
import menuItems from './menuItems'

const Sidebar = () => {
  const { isSideMenuOpen, closeSideMenu } = useContext(UIContext)
  return (
    <Drawer anchor='left' open={isSideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant='h4'>Menu</Typography>
        </Box>
        <List>
          {menuItems.map(({ text, Icon }) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map(({ text, Icon }) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar
