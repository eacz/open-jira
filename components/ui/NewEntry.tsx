import { ChangeEvent, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

const NewEntry = () => {
  const [isAdding, setIsAdding] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [touch, setTouch] = useState(false)

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)

  const onCancel = () => {
    setIsAdding(false)
    setTouch(false)
  }

  const onSave = () => {
    if (!inputValue) return
    console.log(inputValue)
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAdding ? (
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
        <Button startIcon={<AddCircleOutlineIcon />} onClick={() => setIsAdding(true)} fullWidth variant='outlined'>
          Add Task
        </Button>
      )}
    </Box>
  )
}

export default NewEntry
