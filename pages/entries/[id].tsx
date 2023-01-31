import { ChangeEvent, useState, useMemo, useContext } from 'react'
import { GetServerSideProps } from 'next'
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

import { dbEntries } from '../../database'
import { Layout } from '../../components/layouts'
import { Entry, EntryStatus } from '../../interfaces'
import { EntriesContext } from '../../context/entries/EntriesContext'
import { CustomAlert } from '../../components/ui'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

const EntryPage = ({ entry }: Props) => {
  const [input, setInput] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const { updateEntry, deleteEntry } = useContext(EntriesContext)

  const isNotValid = useMemo(() => input.length <= 0 && touched, [input, touched])

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) =>
    setStatus(event.target.value as EntryStatus)

  const onSave = () => {
    if (input.trim().length === 0) return
    const updatedEntry: Entry = { ...entry, status, description: input }
    updateEntry(updatedEntry, true)
  }

  const confirmDelete = async () => {
    deleteEntry(entry._id)
  }

  return (
    <Layout title={input.substring(0, 20) + '...'}>
      <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title={`Entry: `} subheader={`created at ${entry.createdAt} `} />
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

      <IconButton
        sx={{ position: 'fixed', bottom: 30, right: 30, bgcolor: 'error.dark' }}
        onClick={() => setOpenModal(true)}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
      <CustomAlert
        open={openModal}
        setOpen={setOpenModal}
        title='Are you sure you want to delete this entry?'
        description='This action is permanent'
        onConfirm={confirmDelete}
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById(id)

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { entry },
  }
}

export default EntryPage
