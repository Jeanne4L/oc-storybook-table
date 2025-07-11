import styled from "@emotion/styled"

export const ScrollContainer = styled.div`
  overflow-x: auto;
`

export const TableContainer = styled.table<{borderColor: string}>`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
  border: solid 1px ${props => props.borderColor};

  tr, td, th {
    border: solid 1px ${props => props.borderColor};
  }
`