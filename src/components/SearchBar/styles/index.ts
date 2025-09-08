import newStyled from "@emotion/styled"

export const SearchBarContainer = newStyled.div<{borderColor: string, bgColor: string}>`
  display: flex;
  flex: 1;
  max-width: 250px;
  align-items: center;
  border:  solid 1px ${props => props.borderColor};
  background-color: ${props => props.bgColor};
  border-radius: 8px;
  padding-right: 10px;
  
  & input {
    border: none;
    background: transparent;
    outline: none;
    padding: 10px;
    flex: 1;
  }
`