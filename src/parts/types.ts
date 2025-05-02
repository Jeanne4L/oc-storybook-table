type Employee = {
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
  key: string
  content: React.ReactNode
  scope: 'row' | 'global'
  onRowClick: (id: unknown) => void
  color?: string
  onGlobalClick?: () => void
}

export type RowActions = RowAction[]