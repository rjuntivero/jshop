import Button from './Button'
import { useDarkMode } from '../../hooks/useDarkMode'
import SunIcon from '../icons/SunIcon'

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <Button
      onClick={toggleDarkMode}
      className="bg-primary-light dark:bg-secondary-light flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors duration-300"
    >
      {isDarkMode ? 'Dark' : <SunIcon />}
    </Button>
  )
}

export default DarkModeToggle
