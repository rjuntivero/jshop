import React, { ReactNode } from 'react'

interface T {
  children?: ReactNode
  className?: string
  link?: string
}

const ExternalLInk: React.FC<T> = ({ children, className, link }) => {
  return (
    <>
      <a className={className + ' cursor-pointer'} href={link}>
        {children}
      </a>
    </>
  )
}

export default ExternalLInk
