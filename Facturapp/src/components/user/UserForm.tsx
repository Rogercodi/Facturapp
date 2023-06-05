import  { useContext } from "react";


import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FacturappContext, FacturappContextType } from "../../context/Context";
import InputForm from "../elements/input-element";
import GreenalertElement from "../elements/GreenalertElement";
import RedalertElement from "../elements/Redalert-element";

export function UserForm() {

  const navigate = useNavigate();

  const {
    name,
    setName,
    surname,
    setSurname,
    address,
    banknumber,
    city,
    cp,
    dni,
    emailapp,
    iduser,
    setAddress,
    setBanknumber,
    setCity,
    setCp,
    setDni,
    setEmailapp,
    setGreenMessage,
    setRedMessage,
    redMessage,
    greenMessage,
    closeErrorWindow
  } = useContext(FacturappContext) as FacturappContextType;

  const updateUser = async() => {
    let data = {
      iduser,
      name,
      surname,
      emailapp,
      dni,
      banknumber,
      address,
      city,
      cp
    }
   
    let result = await axios({
      url: 'http://localhost:3000/user/edituser',
      method: 'put',
      data: data
    })
    console.log(result)
    if(result.data.greenmessage) {
      setGreenMessage(result.data.greenmessage)
      navigate('/user')
    } else {
      setRedMessage(result.data.redmessage)
    }
  }

  return (
    <div className="">
      {/* ERROR WINDOW */}
      {redMessage === "" ? (
        ""
      ) : (
        <RedalertElement redmessage={redMessage} onClick={closeErrorWindow} />
      )}

      {/* GREEN MESSAGE WINDOWS */}
      {greenMessage === '' ? '' : <GreenalertElement greenmessage={greenMessage} onClick={closeErrorWindow} />}
     
      <h1 className="text-center text-4xl my-4">Mi Perfil</h1>
      <>
      <div className="flex flex-col text-center items-center bg-slate-100">
        <div>
          <label className="px-2" htmlFor="username">
            Nombre
          </label>
          <InputForm id="nombre" type="text" value={name} onChange={() => setName} />
        </div>
        <div>
          <label htmlFor="apellidos">Apellidos </label>
          <InputForm
            id="apellidos"
            type="text"
            value={surname}
            onChange={() => setSurname}
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico </label>
          <InputForm id="email" type="email" value={emailapp} onChange={setEmailapp} />
        </div>
        <div>
          <label htmlFor="dni">DNI </label>
          <InputForm id="dni" type="text" value={dni} onChange={setDni}/>
        </div>
        <div>
          <label htmlFor="numcuenta">Cuenta Bancària </label>
          <InputForm id="numcuenta" type="text" value={banknumber} onChange={setBanknumber} />
        </div>
        <div>
          <label htmlFor="domicilio">Domicilio </label>
          <InputForm id="domicilio" type="text" value={address} onChange={setAddress} />
        </div>
        <div>
          <label htmlFor="poblacion">Población </label>
          <InputForm id="poblacion" type="text" value={city} onChange={setCity} />
        </div>
        <div>
          <label htmlFor="cp"> Código Postal </label>
          <InputForm id="cp" type="text" value={cp} onChange={setCp} />
        </div>
      </div></>
      <div className="flex justify-center mt-10">
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md"
        onClick={updateUser}
        >
          Actualizar Perfil
        </button>
      </div>
    </div>
  );
}
