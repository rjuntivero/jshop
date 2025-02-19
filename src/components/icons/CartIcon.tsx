import React, { ReactNode } from 'react'

interface IconProps {
  color?: string
  width?: number
  height?: number
}
const CartIcon: React.FC<IconProps> = ({ color, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 44 44`}
      fill="none"
    >
      <g clip-path="url(#clip0_40_296)">
        <path
          d="M41.8208 1.66667H34.6541L29.8525 23.9833C29.6886 24.7507 29.2399 25.4399 28.5848 25.9305C27.9297 26.4211 27.11 26.6817 26.2691 26.6667H8.85414C8.0133 26.6817 7.19359 26.4211 6.53849 25.9305C5.88339 25.4399 5.43464 24.7507 5.2708 23.9833L2.40414 10H32.8625M25.6958 35C25.6958 35.9205 26.498 36.6667 27.4875 36.6667C28.477 36.6667 29.2791 35.9205 29.2791 35C29.2791 34.0795 28.477 33.3333 27.4875 33.3333C26.498 33.3333 25.6958 34.0795 25.6958 35ZM5.98747 35C5.98747 35.9205 6.78963 36.6667 7.77914 36.6667C8.76865 36.6667 9.5708 35.9205 9.5708 35C9.5708 34.0795 8.76865 33.3333 7.77914 33.3333C6.78963 33.3333 5.98747 34.0795 5.98747 35Z"
          stroke={color}
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_40_296">
          <rect
            width={width}
            height={height}
            fill="white"
            transform="matrix(-1 0 0 1 43.6125 0)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default CartIcon
