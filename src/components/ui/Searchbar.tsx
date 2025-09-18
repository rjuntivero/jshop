import React, { memo, useState } from 'react';
import SearchIcon from '../icons/SearchIcon';
import Button from './Button';
import Dropdown from './Dropdown';

interface T {
  input?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  results: number;
  sideBarVisible?: boolean;
  showSidebar?: () => void;
}

const Searchbar: React.FC<T> = ({ input, onChange, results, sideBarVisible, showSidebar }) => {
  const filters = ['Newest', 'Oldest', 'Popularity', 'Rating'];
  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };
  return (
    <main className="text-primary-light dark:bg-background-dark flex items-center gap-12 px-6">
      <div className="flex w-full items-center gap-8">
        <Button
          onClick={handleDropdown}
          className={`group hover:bg-secondary-light/40 text-secondary-light dark:bg-background-dark dark:text-accent-dark border-secondary-light dark:border-accent-dark relative hidden items-center justify-center px-4 py-2 text-[0.75rem] transition-all duration-300 md:flex ${
            dropdown ? 'bg-secondary-light/40' : ''
          }`}
        >
          Sort By
          <Dropdown />
          <div
            className={`absolute bottom-0 flex translate-y-full bg-white p-4 shadow-md transition-all duration-150 ease-in-out ${
              dropdown ? 'translate-x-0 opacity-100 focus-within:pointer-events-auto' : '-translate-x-3 opacity-0 not-focus-within:pointer-events-none'
            }`}
          >
            <ul className={`grid items-center justify-center gap-3 overflow-hidden transition-all duration-300 ${dropdown ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              {filters.map((filter) => (
                <li className="hover:bg-secondary-light/40 w-full cursor-pointer p-4 py-2 text-center font-bold transition-all duration-200" key={filter}>
                  {filter}
                </li>
              ))}
            </ul>
          </div>
        </Button>
        <article className="dark:bg-background-dark search-field outline-primary-light dark:outline-secondary-dark flex basis-[400px] items-center rounded-full px-1 py-1 text-sm outline-2">
          <input type="text" placeholder="Search..." value={input} onChange={onChange} className="dark:text-secondary-dark text-primary-light w-full min-w-0 border-red-50 bg-transparent px-4 focus:outline-none" />
          <Button className="dark:bg-background-dark ml-auto">
            <SearchIcon />
          </Button>
        </article>
      </div>
      <div className="dark:bg-background-dark grid grid-cols-[max-content] grid-rows-[repeat(2,auto)] items-center justify-end pr-8 text-right">
        <Button className="bg-primary text-secondary-light dark:text-secondary-dark z-50 row-start-1 hidden justify-self-end rounded-lg lg:block" onClick={showSidebar}>
          {sideBarVisible ? 'Hide' : 'Show'}
        </Button>
        <h1 className="text-primary-light dark:text-accent-dark row-start-2 hidden text-lg md:block">{results} Results</h1>
      </div>
    </main>
  );
};

export default memo(Searchbar);
