import { PropsWithChildren, useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import { EntriesContext, EntriesReducer } from '.'
import { Entry } from '../../interfaces'

export interface EntriesState {
  entries: Entry[]
}

const EntriesInitialState: EntriesState = {
  entries: [],
}

const EntriesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(EntriesReducer, EntriesInitialState)
  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      description,
      _id: uuid(),
      createdAt: Date.now(),
      status: 'pending',
    }
    dispatch({ type: '[Entry] - Add Entry', payload: newEntry })
  }

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] - Entry updated', payload: entry })
  }
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
