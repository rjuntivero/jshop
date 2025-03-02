import { memo } from 'react'

interface IconProps {
  color?: string
  width?: number
  height?: number
}
const CloseIcon: React.FC<IconProps> = ({ color, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 43 43"
      fill="none"
    >
      <path
        d="M32.25 10.75L10.75 32.25M10.75 10.75L32.25 32.25"
        stroke={color}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default memo(CloseIcon)
