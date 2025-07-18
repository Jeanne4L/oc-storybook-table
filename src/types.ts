import { ReactNode } from "react"

export type Column<T extends Record<string | number, any>> = { 
  name: string
  id: Extract<keyof T, string>
  alignment?: "left" | "right" | "center"
}

export type RowAction<T> = {
  scope: 'row'
  placement: 'beginning' | 'end'
  action: (row: T) => ReactNode
} | {
  scope: 'global'
  placement: 'beginning' | 'end'
  action: (row?: T) => ReactNode
}