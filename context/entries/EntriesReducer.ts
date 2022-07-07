import { Entry } from "../../interfaces"
import { EntriesState } from "./EntriesProvider"

type EntriesTypes =
  | { type: "[Entry] - Add Entry"; payload: Entry }
  | { type: "[Entry] - Entry updated"; payload: Entry }

const EntriesReducer = (
  state: EntriesState,
  action: EntriesTypes
): EntriesState => {
  switch (action.type) {
    case "[Entry] - Add Entry":
      return { ...state, entries: [action.payload, ...state.entries] }
    case "[Entry] - Entry updated":
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry._id === action.payload._id ? action.payload : entry
        ),
      }
    default:
      return state
  }
}

export default EntriesReducer
