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
    <div className="text-primary-light dark:bg-background-dark flex items-center justify-between px-6 py-2">
      <div className="left flex gap-8">
        <Button className="text-secondary-light dark:bg-background-dark dark:text-accent-dark border-secondary-light dark:border-accent-dark hidden items-center justify-center rounded-full border-2 px-4 py-2 md:flex">
          Sort By
          <Dropdown />
        </Button>
        <div className="dark:bg-background-dark search-field border-primary-light dark:border-secondary-dark flex items-center border-b-3 pb-2 text-2xl">
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={onChange}
            className="dark:text-secondary-dark text-primary-light bg-transparent focus:outline-none"
          />
          <Button className="dark:bg-background-dark ml-2">
            <SearchIcon />
          </Button>
        </div>
      </div>
      <div className="dark:bg-background-darkright pr-8">
        <Button
          className="bg-primary text-secondary-light dark:text-secondary-dark z-50 hidden rounded-lg lg:block"
          onClick={showSidebar}
        >
          {sideBarVisible ? 'Hide Categories' : 'Show Categories'}
        </Button>
        <h1 className="text-primary-light dark:text-accent-dark hidden text-2xl md:block">
          {results} Results
        </h1>
      </div>
    </div>
  )
}

export default Searchbar
