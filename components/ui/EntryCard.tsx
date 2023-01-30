import { DragEvent, useContext } from 'react'
import { useRouter } from 'next/router'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'

import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui'
import { EntriesContext } from '../../context/entries'
import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
  entry: Entry
}

const EntryCard = ({ entry }: Props) => {
  const { startDragging, endDragging } = useContext(UIContext)
  const { deleteEntry } = useContext(EntriesContext)
  const router = useRouter()

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id)
    startDragging()
  }

  const onDragEnd = () => {
    endDragging()
  }

  return (
    <Card
      onClick={() => router.push(`/entries/${entry._id}`)}
      style={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', paddingRight: 2 }}>
          <DeleteIcon color='error' fontSize='small' onClick={() => deleteEntry(entry._id)} />
          <Typography variant='body2'>30 min ago</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default EntryCard
