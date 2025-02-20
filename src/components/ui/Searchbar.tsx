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
    <div className="text-primary-light flex items-center justify-between">
      <div className="left flex gap-8">
        <Button className="text-secondary-light border-secondary-light hidden items-center justify-center rounded-full border-2 px-4 py-2 md:flex">
          Sort By
          <Dropdown></Dropdown>
        </Button>
        <div className="search-field border-primary-light flex border-b-3 pb-2 text-2xl">
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={onChange}
          />
          <Button>
            <SearchIcon />
          </Button>
        </div>
      </div>
      <div className="right pr-8">
        <Button
          className="bg-primary text-secondary-light z-50 hidden rounded-lg lg:block"
          onClick={showSidebar}
        >
          {sideBarVisible ? 'Hide Categories' : 'Show Categories'}
        </Button>
        <h1 className="hidden text-2xl md:block">{results} Results</h1>
      </div>
    </div>
  )
}

export default Searchbar
