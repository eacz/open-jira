import { ChangeEvent, useContext, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'

const NewEntry = () => {
  const [inputValue, setInputValue] = useState('')
  const [touch, setTouch] = useState(false)
  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingNewEntry, setIsAddingEntry } = useContext(UIContext)
  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)

  const onCancel = () => {
    setIsAddingEntry(false)
    setTouch(false)
  }

  const onSave = () => {
    if (!inputValue) return
    addNewEntry(inputValue)
    setInputValue('')
    setTouch(false)
    setIsAddingEntry(false)
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingNewEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ maringTop: 2, marginBottom: 1 }}
            placeholder='newEntry'
            autoFocus
            multiline
            label='New Entry'
            helperText={inputValue.length <= 0 && touch && 'Enter a value'}
            value={inputValue}
            onChange={onTextChange}
            onBlur={() => setTouch(true)}
            error={inputValue.length <= 0 && touch}
          />
          <Box display='flex' justifyContent='space-between'>
            <Button onClick={onCancel} variant='text' endIcon={<SaveOutlinedIcon />}>
              Cancel
            </Button>
            <Button variant='outlined' onClick={onSave} color='secondary' endIcon={<SaveOutlinedIcon />}>
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setIsAddingEntry(true)}
          fullWidth
          variant='outlined'
        >
          Add Task
        </Button>
      )}
    </Box>
  )
}

export default NewEntry
