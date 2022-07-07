import { useContext, useMemo, DragEvent } from "react"
import { List, Paper } from "@mui/material"
import { EntriesContext } from "../../context/entries/"
import { EntryCard } from "./"
import { EntryStatus } from "../../interfaces"
import { UIContext } from "../../context/ui/UIContext"
import styles from "./EntryList.module.css"

interface Props {
  status: EntryStatus
}

const EntryList = ({ status }: Props) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  )

  const allowDrop = (event: DragEvent) => {
    event.preventDefault()
  }

  const onDropEntry = (event: DragEvent) => {
    const id = event.dataTransfer.getData("text")
    const entry = entries.find((entry) => entry._id === id)!

    entry.status = status
    updateEntry(entry)
    endDragging()
  }

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "scroll",
          padding: "1px 5px",
          backgroundColor: "transparent",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard entry={entry} key={entry._id} />
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default EntryList
