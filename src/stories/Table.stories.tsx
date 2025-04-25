import { Meta, StoryObj } from "@storybook/react"

import { accentColor, columns, data, entriesSelectOptions, headerBg, rowBg, textColor } from "../App"
import Table from "./Table"

const meta: Meta<typeof Table> = {
  title: 'Example/Table',
  component: Table,
  argTypes: {
    colors: {
      headerBg: { control: 'color' },
      rowBg: { control: 'color' },
      accentColor: { control: 'color' },
      textColor: { control: 'color' }
    }
  }
}
 
export default meta

export const Primary: StoryObj<typeof meta> = {
  args: {
    textColor,
    headerBg,
    rowBg,
    accentColor,
    entriesSelectOptions,
    columns,
    data,
  }
}