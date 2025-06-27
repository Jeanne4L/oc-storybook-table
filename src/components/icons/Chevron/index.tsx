import { Svg } from "./styles"

export type ChevronPops = {
  width?: string
  height?: string
  color?: string
  direction?: 'left' | 'right'
  disabled?: boolean
  dataTestId?: string
  onClick?: () => void
}

const Chevron = ({
  width = '15px', 
  height = '24px',
  color = '#000',
  direction = 'right',
  disabled = false,
  dataTestId,
  onClick
}: ChevronPops) => {
  return (
    <Svg 
      width={width} 
      height={height} 
      onClick={onClick} 
      direction={direction} 
      disabled={disabled} 
      data-testid={dataTestId}
      viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.000312805 2.82L9.16031 12L0.000312805 21.18L2.82031 24L14.8203 12L2.82031 0L0.000312805 2.82Z" fill={color}/>
    </Svg>
  )
}

export default Chevron