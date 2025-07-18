export type SearchIconPops = {
  width?: string
  height?: string
  color?: string
}

const SearchIcon = ({
  width = '19px', 
  height = '19px',
  color = '#000'
}: SearchIconPops) => {
  return (
    <svg width={width} height={height} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 16C9.775 15.9998 11.4989 15.4056 12.897 14.312L17.293 18.708L18.707 17.294L14.311 12.898C15.4051 11.4997 15.9997 9.77546 16 8C16 3.589 12.411 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16ZM8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2Z" fill={color} />
    </svg>
  )
}

export default SearchIcon