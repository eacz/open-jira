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
  return <UIContext.Provider value={{ isSideMenuOpen: false }}>{children}</UIContext.Provider>
}

export default UIProvider
