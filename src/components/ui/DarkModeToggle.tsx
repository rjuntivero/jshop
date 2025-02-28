import Button from './Button'
import { useDarkMode } from '../../hooks/useDarkMode'
import SunIcon from '../icons/SunIcon'

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <Button
      onClick={toggleDarkMode}
      className="dark:bg-secondary-light motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors"
    >
      {isDarkMode ? 'Dark' : <SunIcon color="#442727" />}
    </Button>
  )
}

export default DarkModeToggle
