import React, { memo } from 'react'

interface OverlayProps {
  className?: string
}
const Overlay: React.FC<OverlayProps> = ({ className }) => {
  return <div className={className}></div>
}

export default memo(Overlay)
