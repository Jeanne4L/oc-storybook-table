import styled from "@emotion/styled"

export const TableBodyRow  = styled.tr<{isEven: boolean, rowBg: string}>`
  width: 100%;
  background-color: ${props => props.isEven ? 'transparent' : props.rowBg};
  text-align: center;
`

export const TableBodyCell = styled.td<{alignment: string, columnWidth?: number}>`
  text-align: ${props => props.alignment};
  vertical-align: top;
  padding: 16px 24px;
  width: ${props => props.columnWidth}%;
  max-width: 200px;
`

export const MessageTd = styled.td`
  text-align: center;
`