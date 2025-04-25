import styled from "@emotion/styled"

export const EntriesSelectContainer = styled.div<{borderColor: string, bgColor: string}>`
  display: flex;
  align-items: center;
  gap: 8px;

  & select {
    border-color: ${props => props.borderColor};
    background-color: ${props => props.bgColor};
    border-radius: 8px;
    padding: 8px 4px;
    cursor: pointer;
  }
`