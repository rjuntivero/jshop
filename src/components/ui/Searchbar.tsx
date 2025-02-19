import SearchIcon from '../icons/SearchIcon'
import Button from './Button'
import Dropdown from './Dropdown'

const Searchbar = () => {
  return (
    <div className="text-primary-light flex items-center justify-between">
      <div className="left flex gap-8">
        <Button className="text-secondary-light border-secondary-light flex items-center justify-center rounded-full border-2 px-4 py-2">
          Sort By
          <Dropdown></Dropdown>
        </Button>
        <div className="search-field border-primary-light flex border-b-3 pb-2 text-2xl">
          <input type="text" placeholder="Search" />
          <Button>
            <SearchIcon />
          </Button>
        </div>
      </div>
      <div className="right">
        <h1 className="pr-8 text-2xl">12037 Results</h1>
      </div>
    </div>
  )
}

export default Searchbar
