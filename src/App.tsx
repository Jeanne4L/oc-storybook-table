export const columns = [
  {
    name: "First name",
    id:"firstName"
  },
  {
    name: "Last name",
    id: "lastName"
  },
  {
    name: "Remaining time",
    id: "remainingTime"
  },
  {
    name: "Date",
    id: "date"
  }
]

export const data = [
  {
    id:"johnSmith",
    firstName: "John",
    lastName: "Smith",
    remainingTime: 500,
    date: new Date('2000-03-18').toISOString().split('T')[0]
  },
  {
    id:"janeDoe",
    firstName: "Jane",
    lastName: "Doe",
    remainingTime: 3829,
    date: new Date('1997-10-12').toISOString().split('T')[0]
  },
  {
    id:"tahitiBob",
    firstName: "Tahiti",
    lastName: "Bob",
    remainingTime: 12,
    date: new Date('1993-08-19').toISOString().split('T')[0]
  },
  {
    id:"charlieTheunicorn",
    firstName: "Charlie",
    lastName: "Theunicorn",
    remainingTime: 568,
    date: new Date('952-08-13').toISOString().split('T')[0]
  },
  {
    id:"henrySugar",
    firstName: "Henry",
    lastName: "Sugar",
    remainingTime: 8,
    date: new Date('2025-08-13').toISOString().split('T')[0]
  }
]

export const textColor = '#000'
export const accentColor = '#4E80B2'
export const headerBg = '#DAE0E7'
export const rowBg = '#F3F5F7'

const App = () => {
  return (
    <></>
  )
}

export default App