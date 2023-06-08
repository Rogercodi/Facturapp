import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IAppPayer } from "../../../../backend/src/app-types/payer-type";
import { FacturappContext } from "../../context/Context";
import { FacturappContextType } from "../Types/Context-Type";
import axios from "axios";
import GreenalertElement from "../elements/GreenalertElement";
import RedalertElement from "../elements/Redalert-element";

function MyPayers() {
  //CONTEXT
  const {
    payers,
    setUpdatePayer,
    redMessage,
    setRedMessage,
    setGreenMessage,
    closeErrorWindow,
    greenMessage,
    name,
    protectRoute,
    axiosCall
  } = useContext(FacturappContext) as FacturappContextType;

  const navigate = useNavigate();

  //DELETE PAYER
  const deletePayer = (id: number | undefined) => {
    axiosCall('user/deletepayer', "delete", { id })
      .then((result) => {
        if (result.data.redmessage) {
          setRedMessage(result.data.redmessage);
        } else {
          setGreenMessage(result.data.greenmessage);
          navigate("/user");
        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

  protectRoute();

  return (
    <div>
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
      <div className="flex flex-col mt-10">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border overflow-hidden dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Apellidos
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Nif
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Domicilio
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Poblacion
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      CP
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {payers?.map((item: IAppPayer, index: number) => {
                    return (
                      <tr key={index + 1}>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                          {item.idpayer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.apellidos}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.nif}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.domicilio}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.poblacion}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          {item.cp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                            onClick={() => {
                              setUpdatePayer(item);
                              navigate("/user/updatepayer");
                            }}
                          >
                            Actualizar
                          </button>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 ml-1 rounded"
                            onClick={() => deletePayer(item.idpayer)}
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
        </div>
      </div>
      <div className="flex justify-center mt-16 ">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-14 rounded"
          onClick={() => {
            setUpdatePayer(null);
            navigate("/user/newpayer");
          }}
        >
          Nuevo Pagador
        </button>
      </div>
    </div>
  );
}

export default MyPayers;
