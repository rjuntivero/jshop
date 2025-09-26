import { memo } from 'react';
import DropdownIcon from '../icons/DropdownIcon';

const Dropdown = () => {
  return (
    <div className="flex items-center gap-4  p-2 outline-1 outline-gray-400/15 bg-secondary-dark cursor-pointer shadow-sm rounded-md">
      <h1 className="">Filter</h1>
      <DropdownIcon />
    </div>
  );
};

export default memo(Dropdown);
