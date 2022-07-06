import { DragEvent } from "react"
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material"
import { Entry } from "../../interfaces"

interface Props {
  entry: Entry
}

const EntryCard = ({ entry }: Props) => {
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text", entry._id)
  }

  const onDragEnd = () => {}

  return (
    <Card
      style={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">30 min ago</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default EntryCard
