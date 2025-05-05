import React, { memo } from 'react'

interface IconProps {
  color?: string
  width?: string
  height?: string
}
const MenuIcon: React.FC<IconProps> = ({
  color,
  height = '49',
  width = '48',
}) => {
  return (
    <svg
      className="hover:motion-preset-shake"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 48 49"
      fill="none"
    >
      <path
        d="M6 24.5H42M6 12.5H42M6 36.5H42"
        stroke={color}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default memo(MenuIcon)
