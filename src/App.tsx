import { Outlet } from 'react-router-dom'
import { CartProvider } from './components/contexts/CartContext'

function App() {
  return (
    <div className="wrapper bg-background-light dark:bg-background-dark flex min-h-screen flex-col">
      <CartProvider>
        <Outlet />
      </CartProvider>
    </div>
  )
}

export default App
