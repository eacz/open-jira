import { createContext } from 'react'
interface ContextProps {
  isSideMenuOpen: boolean
}

export const UIContext = createContext({} as ContextProps)
