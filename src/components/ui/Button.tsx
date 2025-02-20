import React, { memo, ReactNode } from 'react'

interface ButtonProps {
  children?: ReactNode
  className?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <>
      <button className={className + ' cursor-pointer'} onClick={onClick}>
        {children}
      </button>
    </>
  )
}

export default memo(Button)
