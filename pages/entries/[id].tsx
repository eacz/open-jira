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
  return (
    <Layout title='xd'>
      <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title='Entrada:' subheader={`created at `} />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='New Entry'
                autoFocus
                multiline
                label='New Entry'
              />

              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup row>
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
                <Button startIcon={<SaveOutlinedIcon />} variant='contained' fullWidth>
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
