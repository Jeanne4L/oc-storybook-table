# OCTable 

OCTable is a compound React component library for rendering customizable data tables.


## Installation

```bash
npm install octable
```


## Overview

OCTable uses the compound component pattern. You compose your table using the provided subcomponents. Only required elements need to be rendered.


### Available Components

- `<Table>`: root container (**required**)
- `<Table.Content>`: wraps `<Table.Head>` and `<Table.Body>` (**required** if any of them is used)
- `<Table.Head>`: renders the header row (**optional**)
- `<Table.Body>`: renders table rows (**optional**)
- `<Table.Toolbar>`: wraps `<Table.EntriesSelector>` and `<Table.SearchBar>` (**required** if any of them is used)
- `<Table.EntriesSelector>`: dropdown to choose number of entries per page (**optional**)
- `<Table.SearchBar>`: input to filter rows by keyword (**optional**)
- `<Table.Pagination>`: page navigation component (**optional**)


## Types


### Column<T>

Defines the structure of a column in the table.

```ts
type Column<T extends Record<string | number, any>> = {
  name: string
  id: Extract<keyof T, string | number>
  alignment?: "left" | "right" | "center"
}
```

| Property   | Type                                | Required        | Description                                       |
| :--------- | :---------------------------------- | :-------------- | :------------------------------------------------ |
| name       | string                              | Yes             | Label displayed in the table header               |
| id         | Extract<keyof T, string \| number>  | Yes             | Key used to extract the value from the row object |
| alignment  | "left" \| "right" \| "center"       | No              | Text alignment inside the column                  |


### RowAction<T>

Adds custom React elements (e.g., buttons) for table actions.

```ts
type RowAction<T> =
  | {
      scope: 'row'
      placement: 'beginning' | 'end'
      action: (row: T) => ReactNode
    }
  | {
      scope: 'global'
      placement: 'beginning' | 'end'
      action: (row?: T) => ReactNode
    }
```

#### Variants

- Row-scoped action

Injected once per row. Can access row data.

| Property   | Type                   | Required   | Description                                       |
| :--------- | :--------------------- | :--------- | :------------------------------------------------ |
| scope      | 'row'                  | Yes        | Declares the action is tied to a data row         |
| placement  | 'beginning' \| 'end'   | Yes        | Where the action cell is inserted in the row      |
| action     | (row: T) => ReactNode  | Yes        | Function returning a React element                |

- Global-scoped action

Injected once in the table head or footer (not per row). Used for global controls.

| Property  | Type                   | Required   | Description                                                                                  |
| :-------- | :--------------------- | :--------- | :------------------------------------------------------------------------------------------- |
| scope     | 'global'               | Yes        | Declares the action is rendered in both the header and all table rows                        |
| placement | 'beginning' \| 'end'   | Yes        | Position of the action column in the table                                                   |
| action    | (row?: T) => ReactNode | Yes        | Function rendering a global element (if row is undefined) or row element (if row is defined) |


## Props

| Prop                 | Type            | Required        | Default value  | Description                                  |
| :------------------- | :-------------- | :-------------- | :------------- | :------------------------------------------- |
| columns              | Column\<T>[]    | Yes             | -              | Table column definitions                     |
| data                 | T[]             | Yes             | -              | Data to be displayed                         |
| children             | ReactNode       | Yes             | -              | Nested compound components                   |
| rowActions           | RowAction\<T>[] | No              | -              | Optional actions per row (edit, delete, etc) |
| entriesSelectOptions | number[]        | No              | [data.length]  | List of entry counts available in selector   |
| headerBg             | string          | No              | #DAE0E7      | CSS background for the header row            |
| rowBg                | string          | No              | #F3F5F7      | CSS background for data rows                 |
| accentColor          | string          | No              | #4E80B2      | Color for active elements (pagination, etc.) |
| textColor            | string          | No              | #000           | Text color for all rows                      |


## Example

```tsx
import { Table } from 'octable' // Subcomponents accessed via Table.X

type User = {
  id: number
  name: string
  email: string
}

const columns = [
  { name: 'ID', id: 'id', alignment: 'left' },
  { name: 'Name', id: 'name', alignment: 'left' },
  { name: 'Email', id: 'email', alignment: 'left' }
]

const data: User[] = [
  { id: 1, name: 'Alice Dupont', email: 'alice@example.com' },
  { id: 2, name: 'Bob Martin', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Dubois', email: 'charlie@example.com' }
]

const rowActions = [
  {
    scope: 'row',
    placement: 'end',
    action: (row: User) => <button onClick={() => alert(`Editing ${row.name}`)}>Edit</button>
  },
  {
    scope: 'global',
    placement: 'beginning',
    action: () => <button onClick={() => alert('Delete all users')}>🗑️</button>
  }
]

const tableArgs = {
  columns,
  data,
  rowActions,
  entriesSelectOptions: [10, 25, 50],
  headerBg: '#f2f2f2',
  rowBg: '#fff',
  accentColor: '#007bff',
  textColor: '#333'
}

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
```