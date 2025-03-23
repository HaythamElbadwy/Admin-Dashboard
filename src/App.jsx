import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Customers from './components/Customers/Customers'
import Layout from './components/Layout/Layout'
import Reseller from './components/Reseller/Reseller'
import Settings from './components/Settings/Settings'
import EditContent from './components/EditContent/EditContent'
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ResellerCustomer from './components/ResellerCustomer/ResellerCustomer'
import ProviderCustomer from './components/ProviderCustomer/ProviderCustomer'

function App() {
  const [count, setCount] = useState(0)
  const routes = createBrowserRouter([

    {
      path: "/",
      element:
        <ProtectedRoutes>
          <Login />
        </ProtectedRoutes>,
    },
    {
      path: "/layout",
      element:
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>,
      children: [

        {
          path: "customer",
          element:
            <ProtectedRoutes>
              <Customers />
            </ProtectedRoutes>,
        },
        {
          path: "editContent",
          element:
            <ProtectedRoutes>
              <EditContent />
            </ProtectedRoutes>,
        },
        {
          path: "reseller",
          element:
            <ProtectedRoutes>
              <Reseller />
            </ProtectedRoutes>,
        },
        {
          path: "setting",
          element:
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
        },
        {
          path: "reseller/resellerCustomer/:id",
          element:
            <ProtectedRoutes>
              <ResellerCustomer />
            </ProtectedRoutes>
        },
        {
          path: "providerCustomer",
          element:
            <ProtectedRoutes>
              <ProviderCustomer />
            </ProtectedRoutes>
        },
      ]
    },

  ])


  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  )
}

export default App
