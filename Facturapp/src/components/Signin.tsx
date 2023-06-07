import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FacturappContext, FacturappContextType } from "../context/Context";
import { UserAppI } from "../../../backend/src/app-types/user-types";
import RedalertElement from "./elements/Redalert-element";
import validator from "validator";
import FormInputElement from "./elements/FormInputElement";
import GreenalertElement from "./elements/GreenalertElement";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    setIduser,
    setAddress,
    setBanknumber,
    setCity,
    setCp,
    setDni,
    setEmailapp,
    setName,
    setSurname,
    setRedMessage,
    redMessage,greenMessage,
    closeErrorWindow,
  } = useContext(FacturappContext) as FacturappContextType;

  const handleLogin = async () => {
    let data = {
      email,
      password,
    };

    let result = await axios({
      url: "http://localhost:3000/signin",
      method: "post",
      data: data,
    });
    console.log(result);

    if(result.data.redmessage){
      setRedMessage(result.data.redmessage)
    }
    

    else {
      let user: UserAppI = result.data.appUser;
    let { address, banknumber, city, cp, dni, iduser, name, surname } = user;
    
        setName(name),
        setSurname(surname),
        setDni(dni),
        setAddress(address),
        setBanknumber(banknumber),
        setCp(cp),
        setIduser(iduser),
        setCity(city),
        setEmailapp(email),
        setTimeout(() => navigate("/user"), 500);
    }
  };

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
      {greenMessage === '' ? '' : <GreenalertElement greenmessage={greenMessage} onClick={closeErrorWindow} />}
     
    </div>

      <h1 className="flex justify-center text-5xl mt-10 font-bold">
        Bienvenido/a a Facturapp!
      </h1>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Acceder a tu cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="post">
            <div>
              <FormInputElement
                id={"email"}
                name={"email"}
                type={"email"}
                autoComplete={"email-current"}
                onChange={setEmail}
                htmlFor={"email"}
                children={"Correo Electrónico"}
              />
            </div>

            <div>
            <FormInputElement
                id={"password"}
                name={"password"}
                type={"password"}
                autoComplete={"password-current"}
                onChange={setPassword}
                htmlFor={"password"}
                children={"Contraseña"}
              />
              <Link
              to={"/recovery"}
              className="font-semibold text-sm leading-6 text-indigo-600 hover:text-indigo-500"
            >
              
              Has olvidado la contraseña?
            </Link>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (validator.isEmail(email)) {
                    if (password.length < 1) {
                      setRedMessage("Todos los campos son obligatorios");
                    } else {
                      return handleLogin();
                    }
                  } else {
                    setRedMessage("Introduzca un email válido");
                  }
                }}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Aún no estás registrado?
            <Link
              to={"/signup"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Hazlo en un solo paso!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
