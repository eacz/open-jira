import { PropsWithChildren, useEffect, useReducer } from 'react'
import { useSnackbar } from 'notistack'

import { EntriesContext, EntriesReducer } from '.'
import { Entry } from '../../interfaces'
import { entriesApi } from '../../api'
import { IEntry } from '../../models/Entry'

export interface EntriesState {
  entries: Entry[]
}

const EntriesInitialState: EntriesState = {
  entries: [],
}

const EntriesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(EntriesReducer, EntriesInitialState)
  const { enqueueSnackbar } = useSnackbar()

  const addNewEntry = async (description: string) => {
    try {
      const res = await entriesApi.post<{ entry: Entry }>('/entries', { description })
      const { entry } = res.data
      dispatch({ type: '[Entry] - Add Entry', payload: entry })
    } catch (error) {
      //TODO show error with a toast
      console.log(error)
    }
  }

  const updateEntry = async ({ _id, status, description }: Entry, showSnackBar = false) => {
    try {
      const { data } = await entriesApi.put<{ entry: IEntry }>(`/entries/${_id}`, {
        status,
        description,
      })
      dispatch({ type: '[Entry] - Entry updated', payload: data.entry })
      if (showSnackBar) {
        enqueueSnackbar('Entry updated', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        })
      }
    } catch (error) {
      //TODO show error with a toast
      console.log(error)
    }
  }

  const deleteEntry = async (_id: string) => {
    try {
      await entriesApi.delete<{ entry: IEntry }>(`/entries/${_id}`)
      dispatch({ type: '[Entry] - Delete Entry', payload: _id })
    } catch (error) {
      //TODO show error with a toast
      console.log(error)
    }
  }

  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<{ entries: IEntry[] }>('/entries')
      dispatch({ type: '[Entry] - Load initial entries', payload: data.entries })
    } catch (error) {
      //TODO show error with a toast
      console.log(error)
    }
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        //Methods
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}

export default EntriesProvider
