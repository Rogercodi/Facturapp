import React, { useContext, useState } from "react";

import InputForm from "../elements/input-element";
import { FacturappContext, FacturappContextType } from "../../context/Context";

export function UserForm() {
  const {
    name,
    setName,
    surname,
    setSurname,
    address,
    bankNumber,
    city,
    cp,
    dni,
    emailApp,
    iduser,
    setAddress,
    setBankNumber,
    setCity,
    setCp,
    setDni,
    setEmailApp,
  } = useContext(FacturappContext) as FacturappContextType;

  return (
    <div className="">
      <h1 className="text-center text-4xl my-4">Mi Perfil</h1>
      <div className="flex flex-col text-center items-center bg-slate-100">
        <div>
          <label className="px-2" htmlFor="username">
            Nombre
          </label>
          <InputForm id="nombre" type="text" value={name} onChange={setName} />
        </div>
        <div>
          <label htmlFor="apellidos">Apellidos </label>
          <InputForm
            id="apellidos"
            type="text"
            value={surname}
            onChange={setSurname}
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico </label>
          <InputForm id="email" type="email" value={emailApp} onChange={setEmailApp} />
        </div>
        <div>
          <label htmlFor="dni">DNI </label>
          <InputForm id="dni" type="text" value={dni} onChange={setDni}/>
        </div>
        <div>
          <label htmlFor="numcuenta">Cuenta Bancària </label>
          <InputForm id="numcuenta" type="text" value={bankNumber} onChange={setBankNumber} />
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
      </div>
      <div className="flex justify-center mt-10">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md">
          Actualizar Perfil
        </button>
      </div>
    </div>
  );
}