import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Landing from './components/Landing.tsx'
import Signin from './components/Signin.tsx'
import Signup from './components/Signup.tsx'
import App from './App.tsx'
import InvoiceForm from './components/user/InvoiceForm.tsx'
import UserNav from './components/user/UserNav.tsx'
import MyInvoices from './components/user/MyInvoices.tsx'
import MyPayers from './components/user/MyPayers.tsx'
import axios from 'axios'
import { FacturappContextProvider } from './components/context/Context.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    children: [{
      path: '/signin',
      element: <Signin />
    }, {
      path: '/signup',
      element: <Signup />
    }]
  }, {
    path: '/user',
    element: [<UserNav />, <FacturappContextProvider />, <App />],
  }, {
    path: '/user/data',
    element: <UserNav />,
    children: [{
      path: '/user/data/myinvoices',
      element: <MyInvoices />,
      loader: async () => {
        let result = await axios({
          url: 'http://localhost:3000/user/myinvoices',
          method: 'get'
        })
        return result
      }
      
    }, {
      path: '/user/data/mypayers',
      element: <MyPayers />
    }, {
      path: '/user/data/newinvoice',
      element: <InvoiceForm />
    }]
  }  
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
