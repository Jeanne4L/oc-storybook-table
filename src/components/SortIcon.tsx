export type SortIconPops = {
  width?: string
  height?: string
  bottomActive?: boolean
  topActive?: boolean
  disabled?: boolean
  color?: string
}

const SortIcon = ({
  width = '9px', 
  height = '13px',
  bottomActive = true,
  topActive = true,
  color = '#000',
  disabled = false
}: SortIconPops) => {
  return (
    <svg width={width} height={height} viewBox="0 0 8.9416075 12.441053" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m 0.75205264,7.2207031 c -0.66875039,0 -1.003125,0.80938 -0.53124999,1.28125 L 3.9434589,12.220703 c 0.29062,0.2938 0.7648437,0.2938 1.0585937,0 l 3.71875,-3.7187499 c 0.47188,-0.47187 0.1375,-1.28125 -0.53125,-1.28125 z"
        fill={color}
        fillOpacity={disabled || !bottomActive ? 0.2 : 0.6}
      />
      <path
        d="M 4.4708026,0 C 4.2790064,0 4.0887689,0.07382838 3.9434589,0.22070313 L 0.22080265,3.9394531 c -0.47187501,0.47188 -0.1375004,1.28125 0.53124999,1.28125 H 8.1895526 c 0.66875,0 1.00313,-0.80937 0.53125,-1.28125 L 5.0020526,0.22070313 C 4.8551776,0.07382838 4.6625989,0 4.4708026,0 Z"
        fill={color}
        fillOpacity={disabled || !topActive ? 0.2 : 0.6}
      />
    </svg>
  )
}

export default SortIcon