import { PropsWithChildren, useReducer } from 'react'
import { UIContext, UIReducer } from '.'

export interface UIState {
  isSideMenuOpen: boolean
  isAddingNewEntry: boolean
}

const UIInitialState: UIState = {
  isSideMenuOpen: false,
  isAddingNewEntry: false,
}

const UIProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(UIReducer, UIInitialState)
  const openSideMenu = () => dispatch({ type: '[UI] - Open Side Bar' })
  const closeSideMenu = () => dispatch({ type: '[UI] - Close Side Bar' })

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: '[UI] - Set isAdding', payload: isAdding })
  }

  return (
    <UIContext.Provider
      value={{
        ...state,

        //Methods
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export default UIProvider
