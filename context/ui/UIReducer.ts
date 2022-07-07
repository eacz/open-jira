import { UIState } from './UIProvider'

type UITypes =
  | { type: '[UI] - Open Side Bar' }
  | { type: '[UI] - Close Side Bar' }
  | { type: '[UI] - Set isAdding'; payload: boolean }
  | { type: '[UI] - Start Dragging' }
  | { type: '[UI] - End Dragging' }

const UIReducer = (state: UIState, action: UITypes): UIState => {
  switch (action.type) {
    case '[UI] - Open Side Bar':
      return { ...state, isSideMenuOpen: true }
    case '[UI] - Close Side Bar':
      return { ...state, isSideMenuOpen: false }
    case '[UI] - Set isAdding':
      return { ...state, isAddingNewEntry: action.payload }
    case '[UI] - Start Dragging':
      return {...state, isDragging: true}
    case '[UI] - End Dragging':
      return {...state, isDragging: false}
      default:
      return state
  }
}

export default UIReducer
