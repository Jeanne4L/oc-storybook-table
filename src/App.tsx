import Table from './parts/Table'
import { ColumnsData, EmployeesData, RowActions } from './parts/types'

export const columns: ColumnsData = [
  {
    name: "First name",
    id:"firstName"
  },
  {
    name: "Last name",
    id: "lastName"
  },
  {
    name: "Date of birth",
    id: "birthDate"
  },
  {
    name: "Start date",
    id: "startDate"
  },
  {
    name: "Department",
    id: "department"
  },
  {
    name: "Zip code",
    id: "zipCode"
  },
  {
    name: "Street",
    id: "street"
  },
  {
    name: "City",
    id: "city"
  },
  {
    name: "State",
    id: "state"
  }
]

export const data: EmployeesData = [
  {
    id:"johnSmith",
    firstName: "John",
    lastName: "Smith",
    birthDate: "10/01/1990",
    startDate: "01/01/2025",
    department: "Marketing",
    zipCode: "10001",
    street: "Main street",
    city: "New York City",
    state: "New York"
  },
  {
    id:"janeDoe",
    firstName: "Jane",
    lastName: "Doe",
    birthDate: "15/11/1975",
    startDate: "23/04/2001",
    department: "Sales",
    zipCode: "19980",
    street: "Walnut shade road",
    city: "Woodside",
    state: "Delaware"
  },
  {
    id:"thimotheBlob",
    firstName: "Timothé",
    lastName: "Blob",
    birthDate: "30/07/2000",
    startDate: "23/11/2024",
    department: "Ceci est un service avec un texte très long",
    zipCode: "29401",
    street: "Spring street",
    city: "Charleston",
    state: "South Carolina"
  },
  {
    id:"rogerSmith",
    firstName: "Roger",
    lastName: "Smith",
    birthDate: "10/01/1990",
    startDate: "01/01/2025",
    department: "Marketing",
    zipCode: "10001",
    street: "Main street",
    city: "New York City",
    state: "New York"
  },
  {
    id:"marieDoe",
    firstName: "Marie",
    lastName: "Doe",
    birthDate: "15/11/1975",
    startDate: "23/04/2001",
    department: "Sales",
    zipCode: "19980",
    street: "Walnut shade road",
    city: "Woodside",
    state: "Delaware"
  },
  {
    id:"jasonBlob",
    firstName: "Jason",
    lastName: "Blob",
    birthDate: "30/07/2000",
    startDate: "23/11/2024",
    department: "Ceci est un service avec un texte très long",
    zipCode: "29401",
    street: "Spring street",
    city: "Charleston",
    state: "South Carolina"
  },
  {
    id:"albertSmith",
    firstName: "Albert",
    lastName: "Smith",
    birthDate: "10/01/1990",
    startDate: "01/01/2025",
    department: "Marketing",
    zipCode: "10001",
    street: "Main street",
    city: "New York City",
    state: "New York"
  },
  {
    id:"karineDoe",
    firstName: "Karine",
    lastName: "Doe",
    birthDate: "15/11/1975",
    startDate: "23/04/2001",
    department: "Sales",
    zipCode: "19980",
    street: "Walnut shade road",
    city: "Woodside",
    state: "Delaware"
  },
  {
    id:"aliceBlob",
    firstName: "Alice",
    lastName: "Blob",
    birthDate: "30/07/2000",
    startDate: "23/11/2024",
    department: "Ceci est un service avec un texte très long",
    zipCode: "29401",
    street: "Spring street",
    city: "Charleston",
    state: "South Carolina"
  },
  {
    id:"thomasSmith",
    firstName: "Thomas",
    lastName: "Smith",
    birthDate: "10/01/1990",
    startDate: "01/01/2025",
    department: "Marketing",
    zipCode: "10001",
    street: "Main street",
    city: "New York City",
    state: "New York"
  },
  {
    id:"pierreDoe",
    firstName: "Pierre",
    lastName: "Doe",
    birthDate: "15/11/1975",
    startDate: "23/04/2001",
    department: "Sales",
    zipCode: "19980",
    street: "Walnut shade road",
    city: "Woodside",
    state: "Delaware"
  },
  {
    id:"leaBlob",
    firstName: "Léa",
    lastName: "Blob",
    birthDate: "30/07/2000",
    startDate: "23/11/2024",
    department: "Ceci est un service avec un texte très long",
    zipCode: "29401",
    street: "Spring street",
    city: "Charleston",
    state: "South Carolina"
  }
]

export const rowActions: RowActions = [
  {
    scope: 'global',
    placement: 'beginning',
    action: () => <input type="checkbox" name="blob" id="blob" onChange={() => console.log('check')}/>
  },
  {
    scope: 'row',
    placement: 'end',
    action: (row) => <input type="checkbox" name="blob" id="blob" onChange={() => console.log(row)}/>
  },
]

export const entriesSelectOptions = [5,10,25,50,100]

export const textColor = '#000'
export const accentColor = '#769FAF'
export const headerBg = 'rgba(118, 159, 175, 0.4)'
export const rowBg = 'rgba(118, 159, 175, 0.1)'

const App = () => {
  const tableArgs = {
    columns,
    data,
    textColor,
    headerBg,
    rowBg,
    accentColor,
    entriesSelectOptions,
    rowActions
  }

  return (
    <Table {...tableArgs}>
      <Table.Toolbar>
        <Table.EntriesSelector />
        <Table.SearchBar />
      </Table.Toolbar>
      <Table.Content>
        <Table.Head />
        <Table.Body />
      </Table.Content>
      <Table.Pagination />
    </Table>
  )
}

export default App
