import React, { ReactNode } from 'react';
import { memo } from 'react';
interface NavbarProps {
  children?: ReactNode;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className, children }) => {
  return <div className={className + ' def-padding'}>{children}</div>;
};

export default memo(Navbar);
