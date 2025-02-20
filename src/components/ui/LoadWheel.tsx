import LoadIcon from '../icons/LoadIcon'
const LoadWheel = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <p className="font-big-header text-primary-light flex justify-center text-2xl">
        Loading Products
      </p>
      <LoadIcon />
    </div>
  )
}

export default LoadWheel
