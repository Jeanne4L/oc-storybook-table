import { ReactNode } from "react"

export type Employee = {
  id: string
  firstName: string
  lastName: string
  birthDate: string
  startDate: string
  department: string
  zipCode: string
  street: string
  city: string
  state: string
}

export type EmployeesData = Employee[]

type Column = { 
  name: string
  id: keyof Employee
  alignment?: "left" | "right" | "center" 
  percentWidth?: number
}

export type ColumnsData = Column[]

export type RowAction = {
  scope: 'row'
  placement: 'beginning' | 'end'
  action: (row: Employee) => ReactNode
} | {
  scope: 'global'
  placement: 'beginning' | 'end'
  action: () => ReactNode
}

export type RowActions = RowAction[]