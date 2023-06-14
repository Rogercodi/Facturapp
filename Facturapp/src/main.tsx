import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./components/Landing.tsx";
import Signin from "./components/Signin.tsx";
import Signup from "./components/Signup.tsx";
import App from "./App.tsx";
import { FacturappContextProvider } from "./context/Context.tsx";
import InvoiceForm from "./components/user/InvoiceForm.tsx";
import MyInvoices from "./components/user/MyInvoices.tsx";
import MyPayers from "./components/user/MyPayers.tsx";
import { PayerForm } from "./components/user/PayerForm.tsx";
import { UserForm } from "./components/user/UserForm.tsx";
import UserNav from "./components/user/UserNav.tsx";
import RecoveryForm from "./components/RecoveryForm.tsx";





const router = createBrowserRouter([
{
  path: '/',
  element: <Landing />
},
{
  path: '/',
  element: <FacturappContextProvider />,
  children: [{
    path: '/signin',
    element: <Signin />
  }, {
    path: '/signup',
    element: <Signup />
  },{
    path: '/recovery',
    element: <RecoveryForm />
  }
]
},
{
  path: '/user',
  element: <FacturappContextProvider />,
  children: [
    {
      path: '/user',
      element: [<UserNav />, <App />],
    },
    {
        path: '/user/newinvoice',
        element: [<UserNav />, <InvoiceForm />]
      },
      {
        path: '/user/myinvoices',
        element: [<UserNav />, <MyInvoices />],
      },
      {
        path:'/user/newpayer',
        element: [<UserNav />, <PayerForm />]
      },
      {
        path: '/user/mypayers',
        element: [<UserNav />, <MyPayers />]
      },
      {
        path: '/user/updatepayer',
        element: [<UserNav />, <PayerForm />]
      },
      {
        path: '/user/updateinvoice',
        element: [<UserNav />, <InvoiceForm />]
      },
      {
        path: '/user/myprofile',
        element: [<UserNav />, <UserForm />]
      },
  ]
}


]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);



