import { createContext, useContext } from "react"

export const ToolbarContext = createContext({ isInsideToolbar: false })

export const useToolbar = () => useContext(ToolbarContext)