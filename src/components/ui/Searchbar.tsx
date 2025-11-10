import React, { memo } from 'react';
import Button from './Button';
import Dropdown from './Dropdown';
import FilterIcon from '../icons/FilterIcon';
import { useAppSelector } from '@/state/hooks';

interface T {
  results: number;
  sideBarVisible?: boolean;
  showSidebar?: () => void;
}

const Searchbar: React.FC<T> = ({ results, sideBarVisible, showSidebar }) => {
  // const filters = ['Newest', 'Oldest', 'Popularity', 'Rating'];
  // const [dropdown, setDropdown] = useState(false);

  // const handleDropdown = () => {
  //   setDropdown((prev) => !prev);
  // };
  const searchQuery = useAppSelector((state) => state.search.query);

  return (
    <div className=" text-primary-light dark:bg-background-dark flex items-center gap-12 justify-between grow">
      {/* show/hide sidebar and results */}
      <div>
        <h1 className="text-primary-light dark:text-accent-dark row-start-2 hidden text-sm md:block">
          Search results for
        </h1>
        <p className="text-2xl font-semibold">
          {searchQuery} {`(${results})`}
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          className=" py-1 px-2 text-primary-light z-50   justify-self-end rounded-lg lg:block"
          onClick={showSidebar}>
          {sideBarVisible ? (
            <div className="flex gap-4">
              <p>Hide Filters</p>
              <FilterIcon />
            </div>
          ) : (
            <div className="flex gap-4">
              <p>Show Filters</p>
              <FilterIcon />
            </div>
          )}
        </Button>
        <Dropdown />
      </div>
    </div>
  );
};

export default memo(Searchbar);
