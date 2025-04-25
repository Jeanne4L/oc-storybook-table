import newStyled from "@emotion/styled"

export const Svg = newStyled.svg<{direction: 'left' | 'right', disabled: boolean}>`
  transform: ${props => props.direction === 'left' ? 'rotate(180deg)' : 'none'};
  opacity: ${props => props.disabled ? 0.2 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  cursor: pointer;
`