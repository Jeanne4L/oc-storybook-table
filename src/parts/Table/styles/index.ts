import styled from "@emotion/styled"

export const MainContainer = styled.div<{textColor: string}>`
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;

  * {
    color: ${props => props.textColor};
  }
`