import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./components/Landing.tsx";
import Signin from "./components/Signin.tsx";
import Signup from "./components/Signup.tsx";
import App from "./App.tsx";

import { FacturappContext, FacturappContextProvider, FacturappContextType} from "./context/Context.tsx";


import InvoiceWeb from "./components/invoice/InvoiceWeb.tsx";
import { useContext } from "react";
// import InvoicePDF from "./components/invoice/InvoicePDF.tsx";
import { PDFViewer } from "@react-pdf/renderer";
import InvoiceForm from "./components/user/InvoiceForm.tsx";
import MyInvoices from "./components/user/MyInvoices.tsx";
import MyPayers from "./components/user/MyPayers.tsx";
import { PayerForm } from "./components/user/PayerForm.tsx";
import { UserForm } from "./components/user/UserForm.tsx";
import UserNav from "./components/user/UserNav.tsx";
import Test from "./components/invoice/Test.tsx";

// import InvoicesForRouter from "./components/invoice/InvoicesForRouter.tsx";



//

const router = createBrowserRouter([
// {
//   path: '/',
//   element: <Landing />
// },
{
  path: '/',
  element: <FacturappContextProvider />,
  children: [{
    path: '/signin',
    element: <Signin />
  }, {
    path: '/signup',
    element: <Signup />
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
        path: '/user/myprofile',
        element: [<UserNav />, <UserForm />]
      },
      // {
      //   path: '/user/newinvoice/invoiceweb',
      //   element: <InvoicesForRouter />
      // }
  ]
}


]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);



