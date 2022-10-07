import { PropsWithChildren, useEffect, useReducer } from 'react'
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
  
  const addNewEntry = async (description: string) => {
    try {
      const res = await entriesApi.post<{entry: Entry}>('/entries', { description })
      const { entry } = res.data
      dispatch({ type: '[Entry] - Add Entry', payload: entry })
    } catch (error) {
      
    }

  }

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] - Entry updated', payload: entry })
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<{ entries: IEntry[] }>('/entries')
    dispatch({ type: '[Entry] - Load initial entries', payload: data.entries })
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
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}

export default EntriesProvider
