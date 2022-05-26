import { EntriesState } from './EntriesProvider'

type EntriesTypes = { type: '[Entries] - ActionName' }

const EntriesReducer = (state: EntriesState, action: EntriesTypes): EntriesState => {
  switch (action.type) {
    case '[Entries] - ActionName':
      return { ...state }
    default:
      return state
  }
}

export default EntriesReducer