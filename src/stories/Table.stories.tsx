import { Meta, StoryObj } from "@storybook/react"

import Table, { TableProps } from "../parts/Table"
import { accentColor, columns, data, headerBg, rowBg, textColor } from "../App"
import { useState } from "react"

const meta = {
  title: 'Example/Table',
  component: Table,
  argTypes: {
    'headerBg': { control: 'color' },
    'rowBg': { control: 'color' },
    'accentColor': { control: 'color' },
    'textColor': { control: 'color' },
  }
} as Meta<typeof Table>

export default meta

export const BasicTable: StoryObj<typeof meta> = {
  render: (args) => {
    const tableArgs = args as TableProps<any>

    return (
      <Table {...tableArgs}>
        <Table.Content>
          <Table.Head />
          <Table.Body />
        </Table.Content>
      </Table>
    )
  },
  args: {
    textColor,
    headerBg,
    rowBg,
    accentColor,
    columns,
    data
  }
}

export const TableWithActions: StoryObj<typeof meta> = {
  render: (args) => {
    const tableArgs = args as TableProps<any>

    const [updatedData, setUpdatedData] = useState(data)
    const [censoredIds, setCensoredIds] = useState<string[]>([])

    const handleDeleteData = (row?: any) => {
      if(row) {
        setUpdatedData((prev) => prev.filter((r) => JSON.stringify(r) !== JSON.stringify(row)))
      } else {
        setUpdatedData([])
      }
    }

    const handleCensorRow = (row: any) => {
      const censorText = (text: string) => text.slice(0,10).replace(/./g, '█')

      if(censoredIds.includes(row.id)) {
        setUpdatedData((prev) =>
          prev.map((r) => (r.id === row.id ? data.find((d) => d.id === row.id)! : r))
        )
        setCensoredIds((prev) => prev.filter((id) => id !== row.id))
      } else {
        setUpdatedData((prev) =>
          prev.map((r) =>
            JSON.stringify(r) === JSON.stringify(row)
              ? Object.fromEntries(
                  Object.entries(r).map(([key, value]) => [key, key !== 'id' ? censorText(String(value)) : value])
                )  as typeof r
              : r
          )
        )
        setCensoredIds((prev) => [...prev, row.id])
      }
    }

    const rowActions: any[] = [
      {
        scope: 'global',
        placement: 'beginning',
        action: (row?: any) => <span onClick={() => handleDeleteData(row)}>🗑️</span>
      },
      {
        scope: 'row',
        placement: 'end',
        action: (row: any) => <span onClick={() => handleCensorRow(row)}>🚫</span>
      },
    ]

    return (
      <Table {...tableArgs} data={updatedData} rowActions={rowActions}>
        <Table.Content>
          <Table.Head />
          <Table.Body />
        </Table.Content>
      </Table>
    )
  },
  args: {
    headerBg,
    rowBg,
    accentColor,
    columns
  }
}

export const TableWithTools: StoryObj<typeof meta> = {
  render: (args) => {
    const tableArgs = args as TableProps<any>

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
  },
  args: {
    textColor,
    headerBg,
    rowBg,
    accentColor,
    columns,
    data,
    entriesSelectOptions: [1, 4]
  }
}