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
    date: new Date('2000-03-18').toISOString()
  },
  {
    id:"janeDoe",
    firstName: "Jane",
    lastName: "Doe",
    remainingTime: 3829,
    date: new Date('1997-10-12').toISOString()
  },
  {
    id:"tahitiBob",
    firstName: "Tahiti",
    lastName: "Bob",
    remainingTime: 12,
    date: new Date('1993-08-19').toISOString()
  },
  {
    id:"charlieTheunicorn",
    firstName: "Charlie",
    lastName: "Theunicorn",
    remainingTime: 568,
    date: new Date('952-08-13').toISOString()
  },
  {
    id:"henrySugar",
    firstName: "Henry",
    lastName: "Sugar",
    remainingTime: 8,
    date: new Date('2025-08-13').toISOString()
  }
]

export const textColor = '#000'
export const accentColor = '#769FAF'
export const headerBg = 'rgba(118, 159, 175, 0.4)'
export const rowBg = 'rgba(118, 159, 175, 0.1)'

const App = () => {
  return (
    <></>
  )
}

export default App