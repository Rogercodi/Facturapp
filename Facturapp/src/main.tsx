import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./components/Landing.tsx";
import Signin from "./components/Signin.tsx";
import Signup from "./components/Signup.tsx";
import App from "./App.tsx";
import InvoiceForm from "./components/user/InvoiceForm.tsx";
import UserNav from "./components/user/UserNav.tsx";
import MyInvoices from "./components/user/MyInvoices.tsx";
import MyPayers from "./components/user/MyPayers.tsx";
import axios from "axios";
import { FacturappContextProvider } from "./context/Context.tsx";
import { UserForm } from "./components/user/UserForm.tsx";
import { PayerForm } from "./components/user/PayerForm.tsx";

const router = createBrowserRouter([
{
  path: '/',
  element: <Landing />
},
{
  path: '/signin',
  element: <FacturappContextProvider />,
  children: [{
    path: '/signin',
    element: <Signin />
  }]
},
{
  path: '/user',
  element: <FacturappContextProvider />,
  children: [
    {
      path: '/user',
      element: [<UserNav />, <App />]
    },
    {
        path: '/user/newinvoice',
        element: <InvoiceForm />
      },
      {
        path: '/user/myinvoices',
        element: <MyInvoices />
      },
      {
        path:'/user/newpayer',
        element: <PayerForm />
      },
      {
        path: '/user/mypayers',
        element: <MyPayers />
      },
      {
        path: '/user/myprofile',
        element: <UserForm />
      }
  ]
}


]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);


// {
//   path: '/user',
//   element: <App />
// },
// {
//   path: '/user/newinvoice',
//   element: <InvoiceForm />
// },
// {
//   path: '/user/myinvoices',
//   element: <MyInvoices />
// },
// {
//   path:'/user/newpayer',
//   element: <PayerForm />
// },
// {
//   path: '/user/mypayers',
//   element: <MyPayers />
// },
// {
//   path: '/user/myprofile',
//   element: <UserForm />
// }