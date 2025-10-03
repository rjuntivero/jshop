import { memo } from 'react';
import DropdownIcon from '../icons/DropdownIcon';

const Dropdown = () => {
  return (
    <div className="flex items-center gap-4  p-2  cursor-pointer  rounded-md ">
      <h1 className="">Sort By</h1>
      <DropdownIcon />
    </div>
  );
};

export default memo(Dropdown);
