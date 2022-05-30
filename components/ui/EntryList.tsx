import { List, Paper } from '@mui/material'
import { EntryCard } from './'

const EntryList = () => {
  return (
    <div>
      <Paper
        sx={{
          height: 'calc(100vh - 180px)',
          overflow: 'scroll',
          padding: '1px 5px',
          backgroundColor: 'transparent',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <List sx={{ opacity: 1 }}>
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
        </List>
      </Paper>
    </div>
  )
}

export default EntryList
