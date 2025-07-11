import styled from "@emotion/styled"

export const MainContainer = styled.div<{textColor: string}>`
  display: flex;
  flex-direction: column;
  gap: 32px;

  * {
    color: ${props => props.textColor};
  }
`