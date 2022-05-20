import { PropsWithChildren, useReducer } from 'react'
import { UIContext, UIReducer } from '.'

export interface UIState {
  isSideMenuOpen: boolean
}

const UIInitialState: UIState = {
  isSideMenuOpen: false,
}

const UIProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(UIReducer, UIInitialState)
  const openSideMenu = () => dispatch({ type: 'UI - Open Side Bar' })
  const closeSideMenu = () => dispatch({ type: 'UI - Close Side Bar' })

  return <UIContext.Provider value={{ ...state, openSideMenu, closeSideMenu }}>{children}</UIContext.Provider>
}

export default UIProvider
