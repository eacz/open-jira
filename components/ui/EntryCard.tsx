import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'

const EntryCard = () => {
  return (
    <Card style={{ marginBottom: 1 }}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>Description</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>30 min ago</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default EntryCard
