import { Meta, StoryObj } from "@storybook/react"

import Table, { TableProps } from "../parts/Table"
import { accentColor, columns, data, entriesSelectOptions, headerBg, rowActions, rowBg, textColor } from "../App"

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

export const Primary: StoryObj<typeof meta> = {
  render: (args) => {
    const tableArgs = args as TableProps

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
    entriesSelectOptions,
    rowActions,
    columns,
    data
  }
}
