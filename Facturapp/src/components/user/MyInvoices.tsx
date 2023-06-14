import { useContext, useRef, useState } from "react";
import { IAppInvoice } from "../../../../backend/src/app-types/invoice-type";
import { FacturappContext } from "../../context/Context";
import { FacturappContextType } from "../Types/Context-Type";
import InvoiceWeb from "../invoice/InvoiceWeb";
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import GreenalertElement from "../elements/GreenalertElement";
import RedalertElement from "../elements/Redalert-element";


function MyInvoices() {
  const navigate = useNavigate();

  //CONTEXT
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
    banknumber,
    setPayers,
    closeErrorWindow,
    redMessage,
    greenMessage,
    setRedMessage,
    setGreenMessage,
    axiosCall,
    protectRoute,
    setUpdateInvoice,
  } = useContext(FacturappContext) as FacturappContextType;

  const [invoice, setInvoice] = useState<IAppInvoice>();
  const [verWeb, setVerWeb] = useState(false);

  const componentRef: any = useRef();

  //DELETE INVOICE
  const deleteInvoice = (idInvoice: number | undefined) => {
    axiosCall("/user/deleteinvoice", "delete", { idInvoice }).then((result) => {
      if (result.data.greenmessage) {
        setGreenMessage(result.data.greenmessage);
        navigate("/user");
      } else {
        setRedMessage(result.data.redmessage);
      }
    });
  };

  //GET PAYERS
  const loadPayers = () => {
    let data = { iduser };
    axiosCall("/user/mypayers", "post", data)
      .then((result) => {
        if (result.data.greenmessage) {
          setPayers(result.data.appPayers);
        } else if (result.data.redmessage) {
          setRedMessage(result.data.redmessage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  protectRoute();

  return (
    <>
    {/* MESSAGES */}
      <div className="messages">
        {/* ERROR WINDOW */}
        {redMessage === "" ? (
          ""
        ) : (
          <RedalertElement redmessage={redMessage} onClick={closeErrorWindow} />
        )}

        {/* GREEN MESSAGE WINDOWS */}
        {greenMessage === "" ? (
          ""
        ) : (
          <GreenalertElement
            greenmessage={greenMessage}
            onClick={closeErrorWindow}
          />
        )}
      </div>
      <div
        className="flex flex-col mt-10 mb-10
      "
      >
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
                      Número
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
                      PAGADOR
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                    >
                      EMAIL PAGADOR
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
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                          {item.numero}
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
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => {
                              setInvoice(item);
                              setVerWeb(!verWeb);
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
                          >
                            {verWeb ? "Ocultar Factura" : "Ver Factura"}
                          </button>
                          <button
                            onClick={() => {
                              setUpdateInvoice(item);
                              navigate("/user/updateinvoice");
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded"
                          >
                            Actualizar
                          </button>
                          <button
                            onClick={() => {
                              deleteInvoice(item.idinvoice);
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-14 rounded "
              onClick={() => {
                navigate("/user/newinvoice");
                loadPayers();
              }}
            >
              Nueva Factura
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* INVOICE WEB */}
        <div ref={componentRef} className="">
          {verWeb ? (
            <InvoiceWeb
              base={invoice?.base || 0}
              numero={invoice?.numero || ""}
              iva={invoice?.iva || 0}
              totaliva={invoice?.totaliva || 0}
              irpf={invoice?.irpf || 0}
              totalirpf={invoice?.totalirpf || 0}
              body={invoice?.body || " "}
              fecha={invoice?.fecha || " "}
              total={invoice?.total || 0}
              user={{
                name,
                surname,
                dni,
                address,
                cp,
                city,
                emailapp,
                iduser,
                banknumber,
              }}
              papellidos={invoice?.apellidos || " "}
              pnombre={invoice?.nombre || " "}
              pdomicilio={invoice?.domicilio || " "}
              pcp={invoice?.cp || ""}
              pemail={invoice?.email || ""}
              pnif={invoice?.nif || ""}
              ppoblacion={invoice?.poblacion || ""}
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
