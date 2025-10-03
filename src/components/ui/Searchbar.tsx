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
  const searchQuery = useAppSelector((state) => state.cart.searchQuery);

  return (
    <div className=" text-primary-light dark:bg-background-dark flex items-center gap-12 justify-between">
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

{
  /* <Button
          onClick={handleDropdown}
          className={`group hover:bg-secondary-light/40 text-secondary-light dark:bg-background-dark dark:text-accent-dark border-secondary-light dark:border-accent-dark relative hidden items-center justify-center px-4 py-2 text-[0.75rem] transition-all duration-300 md:flex ${
            dropdown ? 'bg-secondary-light/40' : ''
          }`}
        >
          {/* Sort By
        //   <Dropdown /> */
}
//   <div
//     className={`absolute bottom-0 flex translate-y-full bg-white p-4 shadow-md transition-all duration-150 ease-in-out ${
//       dropdown ? 'translate-x-0 opacity-100 focus-within:pointer-events-auto' : '-translate-x-3 opacity-0 not-focus-within:pointer-events-none'
//     }`}
//   >
//     <ul className={`grid items-center justify-center gap-3 overflow-hidden transition-all duration-300 ${dropdown ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
//       {filters.map((filter) => (
//         <li className="hover:bg-secondary-light/40 w-full cursor-pointer p-4 py-2 text-center font-bold transition-all duration-200" key={filter}>
//           {filter}
//         </li>
//       ))}
//     </ul>
//   </div>
// </Button> */}
