import React from 'react'
import SearchIcon from '../icons/SearchIcon'
import Button from './Button'
import Dropdown from './Dropdown'

interface T {
  input?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  results: number
  sideBarVisible?: boolean
  showSidebar?: () => void
}

const Searchbar: React.FC<T> = ({
  input,
  onChange,
  results,
  sideBarVisible,
  showSidebar,
}) => {
  return (
    <main className="text-primary-light dark:bg-background-dark flex items-center gap-12 px-6 py-2">
      <div className="flex w-full items-center gap-8">
        <Button className="text-secondary-light dark:bg-background-dark dark:text-accent-dark border-secondary-light dark:border-accent-dark hidden items-center justify-center rounded-full border-4 p-2 md:flex">
          Sort By
          <Dropdown />
        </Button>
        <article className="dark:bg-background-dark search-field border-primary-light dark:border-secondary-dark flex flex-1 items-center rounded-full p-3 text-xl outline-2">
          <input
            type="text"
            placeholder="Search..."
            value={input}
            onChange={onChange}
            className="dark:text-secondary-dark text-primary-light w-full min-w-0 bg-transparent focus:outline-none"
          />
          <Button className="dark:bg-background-dark ml-auto">
            <SearchIcon />
          </Button>
        </article>
      </div>
      <div className="dark:bg-background-dark grid grid-rows-[repeat(2,auto)] items-center justify-end pr-8 text-right">
        <Button
          className="bg-primary text-secondary-light dark:text-secondary-dark z-50 row-start-1 hidden justify-self-end rounded-lg lg:block"
          onClick={showSidebar}
        >
          {sideBarVisible ? 'Hide' : 'Show'}
        </Button>
        <h1 className="text-primary-light dark:text-accent-dark row-start-2 hidden text-2xl md:block">
          {results} Results
        </h1>
      </div>
    </main>
  )
}

export default Searchbar
