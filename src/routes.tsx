import App from './App.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import Homepage from './pages/Homepage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import Catalog from './pages/Catalog.tsx'
import ShoppingCart from './pages/ShoppingCart.tsx'

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Homepage />,
      },
      {
        path: 'products',
        element: <Catalog />,
      },
      {
        path: 'product/:name',
        element: <ProductPage />,
      },
      {
        path: 'my-cart',
        element: <ShoppingCart />,
      },
    ],
  },
]

export default routes
