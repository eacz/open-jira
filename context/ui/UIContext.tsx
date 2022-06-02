import { createContext } from 'react'
interface ContextProps {
  isSideMenuOpen: boolean
  isAddingNewEntry: boolean
  openSideMenu: () => void
  closeSideMenu: () => void
  setIsAddingEntry: (isAdding: boolean) => void
}

export const UIContext = createContext({} as ContextProps)
