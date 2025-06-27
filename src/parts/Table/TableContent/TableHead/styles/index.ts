import styled from "@emotion/styled"

export const TableHeaderRow = styled.tr<{headerBg: string}>`
  background-color: ${props => props.headerBg};
  width: 100%;
`

export const TableHeaderCell = styled.th<{
  columnWidth?: number, 
  alignment: 'left' | 'center' | 'right'
}>`
  vertical-align: middle;

  > div {
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 16px 24px;
    width: ${props => props.columnWidth ? `${props.columnWidth}%` : 'auto'};
    cursor: pointer;
    justify-content: ${ props => props.alignment === 'left'
      ? 'flex-start'
      : props.alignment === 'right' 
        ? 'flex-end'
        : 'center'
    }
  }

  & svg {
    overflow: visible
  }
`