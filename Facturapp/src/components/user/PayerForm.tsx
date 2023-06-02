import axios from "axios";
import  { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { IAppPayer } from "../../../../backend/src/app-types/payer-type";
import { FacturappContext, FacturappContextType } from "../../context/Context";
import InputForm from "../elements/input-element";


export function PayerForm() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [nif, setNif] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [poblacion, setPoblacion] = useState("");
  const [cp, setCp] = useState(0);

  const navigate = useNavigate();  
  const { iduser } = useContext(FacturappContext) as FacturappContextType;
  const idusuario = iduser;

  const newPayer = async () => {
    let data: IAppPayer = {
      nombre,
      apellidos,
      email,
      nif,
      domicilio,
      poblacion,
      cp,
      idusuario,
    };
    let result = await axios({
      url: "http://localhost:3000/user/newpayer",
      method: "post",
      data: data,
    });
    if(result.data.result === 1){
      navigate('/user');
    } else {
      //ERROR
    }
  };

  return (
    <div className="bg-slate-200">
      <h1 className="text-center text-4xl my-4">Nuevo Pagador</h1>
      <div className="flex flex-col text-center items-center bg-slate-100">
        <div>
          <label className="px-2" htmlFor="username">
            Nombre
          </label>
          <InputForm id="nombre" type="text" 
          onChange={setNombre} />
        </div>
        <div>
          <label htmlFor="apellidos">Apellidos </label>
          <InputForm id="apellidos" type="text" onChange={setApellidos} />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico </label>
          <InputForm id="email" type="email" onChange={setEmail} />
        </div>
        <div>
          <label htmlFor="dni">DNI </label>
          <InputForm id="dni" type="text" onChange={setNif} />
        </div>
        <div>
          <label htmlFor="domicilio">Domicilio </label>
          <InputForm id="domicilio" type="text" onChange={setDomicilio} />
        </div>
        <div>
          <label htmlFor="poblacion">Población </label>
          <InputForm id="poblacion" type="text" onChange={setPoblacion} />
        </div>
        <div>
          <label htmlFor="cp"> Código Postal </label>
          <InputForm id="cp" type="text" onChange={setCp} />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md"
          onClick={newPayer}
        >
          Anadir Pagador
        </button>
      </div>
    </div>
  );
}
