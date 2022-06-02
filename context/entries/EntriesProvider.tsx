import { PropsWithChildren, useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import { EntriesContext, EntriesReducer } from '.'
import { Entry } from '../../interfaces'

export interface EntriesState {
  entries: Entry[]
}

const EntriesInitialState: EntriesState = {
  entries: [
    { _id: uuid(), description: 'pending', status: 'pending', createdAt: Date.now() },
    { _id: uuid(), description: 'in-progress', status: 'in-progress', createdAt: Date.now() - 1000000 },
    { _id: uuid(), description: 'finished', status: 'finished', createdAt: Date.now() - 100000 },
  ],
}

const EntriesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(EntriesReducer, EntriesInitialState)
  return <EntriesContext.Provider value={{ ...state }}>{children}</EntriesContext.Provider>
}

export default EntriesProvider
