import { useContext, useEffect, useRef, useState } from "react";
import { IAppInvoice } from "../../../../backend/src/app-types/invoice-type";
import { FacturappContext, FacturappContextType } from "../../context/Context";
import InvoiceWeb from "../invoice/InvoiceWeb";
import ReactToPrint from "react-to-print";
import { IAppPayer } from "../../../../backend/src/app-types/payer-type";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyInvoices() {
  const navigate = useNavigate();

  const {
    invoices,
    name,
    address,
    city,
    cp,
    dni,
    emailapp,
    surname,
    iduser,
    banknumber
  } = useContext(FacturappContext) as FacturappContextType;

  const [invoice, setInvoice] = useState<IAppInvoice>();
  const [invoiceState, setInvoiceState] = useState('Generada' || 'Enviada')


 

  // useEffect(() => {
  //   setIdInvoice(invoice?.idinvoice);
  // }, [invoice]);

  const [verWeb, setVerWeb] = useState(false);

  const componentRef: any = useRef();

  const deleteInvoice = async (idInvoice: number | undefined) => {
    
    let result = await axios({
      url: "http://localhost:3000/user/deleteinvoice",
      data: { idInvoice },
      method: "delete",
    });
    console.log(result);
    if (result.data.result === 1) {
      navigate("/user");
    }
  };

  

  return (
    <>
      <div className="flex flex-col mt-10 mb-10
      ">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border overflow-hidden dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                    >
                      Concepto
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                    >
                      Base
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                    >
                      IVA
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                    >
                      IRPF
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                    >
                      TOTAL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {invoices?.map((item: IAppInvoice, index: number) => {
                    return (
                      <tr key={index + 1}>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                          {item.idinvoice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.fecha}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.body}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.base + "€"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.totaliva + "€"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.totalirpf + "€"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.total + "€"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => {
                              setInvoice(item);
                              setVerWeb(!verWeb);
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded"
                          >
                            {verWeb ? "Ocultar Factura" : "Ver Factura"}
                          </button>
                          <button
                            onClick={() => {
                              deleteInvoice(item.idinvoice);
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded"
                          >
                            Eliminar
                          </button>
                          <button 
                          onClick={
                            invoiceState === 'Generada' ? ()=> setInvoiceState('Enviada') : ()=>setInvoiceState('Generada') 
                          }
                          className= {invoiceState === 'Generada' ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" : "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"}>
                            {invoiceState}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* INVOICE WEB */}
        <div ref={componentRef} className="">
          {verWeb ? (
            <InvoiceWeb
              base={invoice?.base || 0}
              iva={invoice?.iva || 0}
              totaliva={invoice?.totaliva || 0}
              irpf={invoice?.irpf || 0}
              totalirpf={invoice?.totalirpf || 0}
              body={invoice?.body || " "}
              fecha={invoice?.fecha || " "}
              total={invoice?.total || 0}
              user={{ name, surname, dni, address, cp, city, emailapp, iduser, banknumber }}
              papellidos={invoice?.apellidos || ' '}
              pnombre={invoice?.nombre || ' '}
              pdomicilio={invoice?.domicilio || ' '}
              pcp={invoice?.cp || ''}
              pemail={invoice?.email || ''}
              pnif={invoice?.nif || ''}
              ppoblacion={invoice?.poblacion || ''}

            />
          ) : (
            ""
          )}
        </div>
        {/* PDF BUTTON */}
        {verWeb ? (
          <div className="flex justify-center mt-10">
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded m-2">
                  Descargar / Imprimir
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        ) : (
          " "
        )}
      </div>
    </>
  );
}

export default MyInvoices;
