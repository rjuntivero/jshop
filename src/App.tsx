import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="wrapper bg-background-light flex min-h-screen flex-col">
      <Outlet />
    </div>
  )
}

export default App
