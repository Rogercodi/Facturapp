import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAppPayer } from "../../../../backend/src/app-types/payer-type";
import { FacturappContext } from "../../context/Context";
import { FacturappContextType } from "../Types/Context-Type";
import InputForm from "../elements/input-element";
import GreenalertElement from "../elements/GreenalertElement";
import RedalertElement from "../elements/Redalert-element";

export function PayerForm() {
  //CONTEXT
  const {
    iduser,
    updatePayer,
    greenMessage,
    redMessage,
    setGreenMessage,
    setRedMessage,
    closeErrorWindow,
    name,
    axiosCall,
    protectRoute,
  } = useContext(FacturappContext) as FacturappContextType;

  const [idpayer, setIdpayer] = useState<number | undefined>(
    updatePayer?.idpayer || 0
  );

  const [nombre, setNombre] = useState(updatePayer?.nombre || "");
  const [apellidos, setApellidos] = useState(updatePayer?.apellidos || "");
  const [email, setEmail] = useState(updatePayer?.email || "");
  const [nif, setNif] = useState(updatePayer?.nif || "");
  const [domicilio, setDomicilio] = useState(updatePayer?.domicilio || "");
  const [poblacion, setPoblacion] = useState(updatePayer?.poblacion || "");
  const [cp, setCp] = useState(updatePayer?.cp || "");

  const navigate = useNavigate();

  const idusuario = iduser;

  //NEW PAYER
  const newPayer = () => {
    let data: IAppPayer = {
      idpayer,
      nombre,
      apellidos,
      email,
      nif,
      domicilio,
      poblacion,
      cp,
      idusuario,
    };

    axiosCall("/user/newpayer", "post", data)
      .then((result) => {
        if (result.data.greenmessage) {
          setGreenMessage(result.data.greenmessage);
          navigate("/user");
        } else {
          setRedMessage(result.data.redmessage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //UPDATE PAYER
  const updatepayer = () => {
    let data: IAppPayer = {
      idpayer,
      nombre,
      apellidos,
      email,
      nif,
      domicilio,
      poblacion,
      cp,
      idusuario,
    };

    axiosCall("/user/updatepayer", "put", data)
      .then((result) => {
        if (result.data.greenmessage) {
          setGreenMessage(result.data.greenmessage);
          navigate("/user");
        } else {
          setRedMessage(result.data.redmessage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  protectRoute();

  return (
    <div className="bg-slate-200">
      {/* MESSAGES */}
      <div className="messages">
        {redMessage === "" ? (
          ""
        ) : (
          <RedalertElement redmessage={redMessage} onClick={closeErrorWindow} />
        )}

        {greenMessage === "" ? (
          ""
        ) : (
          <GreenalertElement
            greenmessage={greenMessage}
            onClick={closeErrorWindow}
          />
        )}
      </div>
      <h1 className="text-center text-4xl my-4">Nuevo Pagador</h1>
      <div className="flex flex-col text-center items-center bg-slate-100">
        <div>
          <label className="px-2" htmlFor="username">
            Nombre
          </label>
          <InputForm
            id="nombre"
            type="text"
            value={nombre || ""}
            onChange={setNombre}
          />
        </div>
        <div>
          <label htmlFor="apellidos">Apellidos </label>
          <InputForm
            id="apellidos"
            type="text"
            value={apellidos || ""}
            onChange={setApellidos}
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico </label>
          <InputForm
            id="email"
            type="email"
            value={email || ""}
            onChange={setEmail}
          />
        </div>
        <div>
          <label htmlFor="dni">DNI </label>
          <InputForm id="dni" type="text" value={nif || ""} onChange={setNif} />
        </div>
        <div>
          <label htmlFor="domicilio">Domicilio </label>
          <InputForm
            id="domicilio"
            type="text"
            value={domicilio || ""}
            onChange={setDomicilio}
          />
        </div>
        <div>
          <label htmlFor="poblacion">Población </label>
          <InputForm
            id="poblacion"
            type="text"
            value={poblacion || ""}
            onChange={setPoblacion}
          />
        </div>
        <div>
          <label htmlFor="cp"> Código Postal </label>
          <InputForm id="cp" type="text" value={cp || ""} onChange={setCp} />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md"
          onClick={idpayer === 0 ? newPayer : updatepayer}
        >
          {idpayer === 0 ? "Nuevo Pagador" : "Actualizar Pagador"}
        </button>
      </div>
    </div>
  );
}
