import { useContext, useMemo, DragEvent } from "react"
import { List, Paper } from "@mui/material"
import { EntriesContext } from "../../context/entries/"
import { EntryCard } from "./"
import { EntryStatus } from "../../interfaces"

interface Props {
  status: EntryStatus
}

const EntryList = ({ status }: Props) => {
  const { entries } = useContext(EntriesContext)

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  )

  const allowDrop = (event: DragEvent) => {
    event.preventDefault()
  }

  const onDropEntry = (event: DragEvent) => {
    const id = event.dataTransfer.getData("text")
    console.log(id)
  }

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop}>
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "scroll",
          padding: "1px 5px",
          backgroundColor: "transparent",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard entry={entry} key={entry._id} />
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default EntryList
