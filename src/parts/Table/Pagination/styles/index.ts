import newStyled from "@emotion/styled"

export const PaginationContainer = newStyled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`

export const PageButton = newStyled.button<{currentPage: boolean, accentColor: string, textColor: string}>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.currentPage ? props.accentColor : props.textColor};
  cursor: pointer;
  font-weight: ${props => props.currentPage && 900};
  border: none;
  background: none;
  border-bottom: solid 2px ${props => props.currentPage ? props.accentColor : 'transparent'};
`