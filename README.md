# OCTable 

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Jeanne4L/oc-storybook-table)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://octable.netlify.app/?path=/story/example-table--basic-table)


OCTable is a compound React component library for rendering customizable data tables.


## Installation

```bash
npm install octable
```


## Overview

OCTable uses the compound component pattern. You compose your table using the provided subcomponents. Only required elements need to be rendered.


### Available Components

- `<Table>`: root container (**required**)
- `<Table.Content>`: wraps `<Table.Head>` and `<Table.Body>` (**required** if you're using `<Table.Head>` or `<Table.Body>`)
- `<Table.Head>`: renders the header row (**optional**)
- `<Table.Body>`: renders table rows (**optional**)
- `<Table.Toolbar>`: wraps `<Table.EntriesSelector>` and `<Table.SearchBar>` (**required** if you're using `<Table.EntriesSelector>` or `<Table.SearchBar>`)
- `<Table.EntriesSelector>`: dropdown to choose number of entries per page (**optional**)
- `<Table.SearchBar>`: input to filter rows by keyword (**optional**)
- `<Table.Pagination>`: page navigation component (**optional**)

**Note**: If you prefer to use your own components for pagination, row count selection, or the search bar, you can use the `usePagination` and `useToolbar` hooks to connect your interface to the table’s internal logic.


## Types

### Column<T>

Defines the structure of a column in the table.

```ts 
type Column<T extends Record<string | number, any>> = {
  id: Extract<keyof T, string>
  name: string
  alignment?: "left" | "right" | "center"
}
```

| Property   | Type                                | Required        | Description                                       |
| :--------- | :---------------------------------- | :-------------- | :------------------------------------------------ |
| id         | Extract<keyof T, string>            | Yes             | Key used to extract the value from the row object |
| name       | string                              | Yes             | Label displayed in the table header               |
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

Injected into the table head and each row. Used for global controls.

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
| borderColor          | string          | No              | #C1CBD7      | Color for borders of the table               |
| textColor            | string          | No              | #000           | Text color for all elements                  |


## Advanced Usage: Custom Controls with Hooks

For greater flexibility, the library provides hooks that let you build your own custom pagination, entry selector, or search controls, all while linking them to the table's internal logic.

`usePagination`

This hook gives you the necessary information to create your own pagination system. It must be used inside the `<Table>` component.

```ts
const { totalItems, itemsPerPage, currentPage, setCurrentPage } = usePagination()
```

| Property        | Type                          | Description                                                            |
| :-------------- | :---------------------------- | :--------------------------------------------------------------------- |
| totalItems      | number                        | The total number of items in the table (after filtering and searching) |
| itemsPerPage    | number                        | The number of items displayed per page                                 |
| currentPage     | number                        | The current page number                                                |
| setCurrentPage  | (currentPage: number) => void | A function to change the active page                                   |

`useToolbar`

This hook provides the functions needed to connect your own entries selector or search bar. It must be used inside the `<Table>` component.

```ts
const { handleSearchBar, handleEntriesSelector } = useToolbar()
```

| Property               | Type                      | Description                                                                                                          |
| :--------------------- | :-------------------------| :------------------------------------------------------------------------------------------------------------------- |
| handleSearchBar        | (value: string) => void   | A function to filter the table rows based on a search value                                                          |
| handleEntriesSelector  | (value: number>) => void  | A function to update the number of items displayed per page. The new number of entries is passed directly as a value |


## Data handling

To display data in OCTable, you provide an array of objects (`data`) and define your table's structure with `Column` definitions. Each `Column`'s `id` property must match a key in your data objects to display that value. Any keys in your data that don't have a corresponding `Column` `id` will be ignored.

```tsx
const data: User[] = [
  { name: 'Alice Dupont', email: 'alice@example.com', userId: 1 },
  // ... other users
]

const columns: Column<User>[] = [
  { id: 'name', name: 'Name' },
  { id: 'email', name: 'Email' }
]
// 'name' and 'email' will be displayed. 'userId' is ignored as there's no matching column.
```


## Example

```tsx
import { Table } from 'octable' // Subcomponents accessed via Table.X

type User = {
  id: number
  name: string
  email: string
}

const data: User[] = [
  { id: 1, name: 'Alice Dupont', email: 'alice@example.com' },
  { id: 2, name: 'Bob Martin', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Dubois', email: 'charlie@example.com' }
]

const columns: Column<User>[] = [
  { id: 'name', name: 'Name', alignment: 'left' },
  { id: 'email', name: 'Email', alignment: 'center' }
]

const rowActions: RowAction<User>[] = [
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