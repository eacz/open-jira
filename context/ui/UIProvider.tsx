import { PropsWithChildren, useReducer } from "react"
import { UIContext, UIReducer } from "."

export interface UIState {
  isSideMenuOpen: boolean
  isAddingNewEntry: boolean
  isDragging: boolean
}

const UIInitialState: UIState = {
  isSideMenuOpen: false,
  isAddingNewEntry: false,
  isDragging: false,
}

const UIProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(UIReducer, UIInitialState)
  const openSideMenu = () => dispatch({ type: "[UI] - Open Side Bar" })
  const closeSideMenu = () => dispatch({ type: "[UI] - Close Side Bar" })

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "[UI] - Set isAdding", payload: isAdding })
  }

  const startDragging = () => {
    dispatch({ type: "[UI] - Start Dragging" })
  }
  const endDragging = () => {
    dispatch({ type: "[UI] - End Dragging" })
  }

  return (
    <UIContext.Provider
      value={{
        ...state,

        //Methods
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        

        startDragging,
        endDragging
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export default UIProvider
