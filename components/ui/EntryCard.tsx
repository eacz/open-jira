import { DragEvent, useContext } from "react"
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material"
import { Entry } from "../../interfaces"
import { UIContext } from "../../context/ui"

interface Props {
  entry: Entry
}

const EntryCard = ({ entry }: Props) => {
  const { startDragging, endDragging } = useContext(UIContext)

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text", entry._id)
    startDragging()
  }

  const onDragEnd = () => {
    endDragging()
  }

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
