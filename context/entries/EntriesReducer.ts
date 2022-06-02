import { Entry } from '../../interfaces'
import { EntriesState } from './EntriesProvider'

type EntriesTypes = { type: '[Entry] - Add Entry'; payload: Entry }

const EntriesReducer = (state: EntriesState, action: EntriesTypes): EntriesState => {
  switch (action.type) {
    case '[Entry] - Add Entry':
      return { ...state, entries: [action.payload, ...state.entries] }
    default:
      return state
  }
}

export default EntriesReducer
