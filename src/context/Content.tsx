import { createContext, useContext } from "react"

export const ContentContext = createContext({isInsideContent: false})

export const useContent = () => useContext(ContentContext)