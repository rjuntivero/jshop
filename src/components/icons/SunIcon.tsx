import React from 'react'

interface IconProps {
  color?: string
}
const SunIcon: React.FC<IconProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="49"
      height="48"
      viewBox="0 0 49 48"
      fill="none"
    >
      <g clip-path="url(#clip0_40_299)">
        <path
          d="M24.4376 2V6M24.4376 42V46M9.07215 8.44L11.8766 11.28M36.9987 36.72L39.8032 39.56M2.71265 24H6.66265M42.2127 24H46.1627M9.07215 39.56L11.8766 36.72M36.9987 11.28L39.8032 8.44M34.3127 24C34.3127 29.5228 29.8915 34 24.4376 34C18.9838 34 14.5626 29.5228 14.5626 24C14.5626 18.4772 18.9838 14 24.4376 14C29.8915 14 34.3127 18.4772 34.3127 24Z"
          stroke={color}
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_40_299">
          <rect
            width="47.4"
            height="48"
            fill="white"
            transform="translate(0.737549)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SunIcon
