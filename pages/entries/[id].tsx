import { ChangeEvent, useState, useMemo } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
  IconButton,
} from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { Layout } from '../../components/layouts'
import { EntryStatus } from '../../interfaces'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

const EntryPage = () => {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<EntryStatus>('pending')
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(() => input.length <= 0 && touched, [input, touched])

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) =>
    setStatus(event.target.value as EntryStatus)

  const onSave = () => {
    if (touched && !input) {
      console.log('ERROR')
    }
    console.log({ input, status })
  }

  return (
    <Layout title='xd'>
      <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title={`Entry ${input}`} subheader={`created at `} />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='New Entry'
                autoFocus
                multiline
                label='New Entry'
                value={input}
                onChange={onTextChange}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && 'Enter a value'}
                error={isNotValid && touched}
              />

              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      label={capitalize(option)}
                      control={<Radio />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <CardActions>
                <Button
                  startIcon={<SaveOutlinedIcon />}
                  variant='contained'
                  fullWidth
                  onClick={onSave}
                  disabled={input.length <= 0}
                >
                  Save
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <IconButton sx={{ position: 'fixed', bottom: 30, right: 30, bgcolor: 'error.dark' }}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  )
}

export default EntryPage
