import styled from "@emotion/styled"

export const TableBodyRow  = styled.tr<{isEven: boolean, rowBg: string}>`
  width: 100%;
  background-color: ${props => props.isEven ? 'transparent' : props.rowBg};
  text-align: center;
`

export const TableBodyCell = styled.td<{alignment: 'left' | 'center' | 'right', isClickable?: boolean}>`
  text-align: ${props => props.alignment};
  vertical-align: top;
  padding: 16px 24px;
  cursor: ${props => props.isClickable ? 'pointer' : 'auto'};
`

export const MessageTd = styled.td`
  text-align: center;
  padding: 16px 24px;
`