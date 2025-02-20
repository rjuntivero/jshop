import React from 'react'

interface IconProps {
  color?: string
}
const MenuIcon: React.FC<IconProps> = () => {
  return (
    <svg
      className="hover:motion-preset-shake"
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="49"
      viewBox="0 0 48 49"
      fill="none"
    >
      <path
        d="M6 24.5H42M6 12.5H42M6 36.5H42"
        stroke="#EFDB9C"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default MenuIcon
