import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <div className="text-primary-light bg-background-light mx-auto my-auto flex min-h-screen w-full flex-col items-center justify-center">
      <div className="error-message pb-6 text-center">
        <h1 className="font-big-header w-3xl pb-6 text-3xl">
          Uh Oh! You weren't supposed to see that...
        </h1>
        <h1 className="text-xl">Page Not Found 404</h1>
      </div>
      <Link
        className="font-sub-header text-secondary-light border-primary-light rounded-full border-3 px-4 py-2 text-3xl"
        to="/"
      >
        Home
      </Link>
    </div>
  )
}

export default ErrorPage
