import axios from "axios";
import { SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FacturappContext, FacturappContextType } from "../context/Context";
import validator from 'validator';
import RedalertElement from "./elements/Redalert-element";
import FormInputElement from "./elements/FormInputElement";
import GreenalertElement from "./elements/GreenalertElement";

function Signup() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const {
    greenMessage,
    redMessage,
    setGreenMessage,
    setRedMessage,
    closeErrorWindow,
    closeErrorWindowTime,
  } = useContext(FacturappContext) as FacturappContextType;

  const registerUser = async () => {
    let user = {
      nombre,
      apellidos,
      email,
      password,
      confirmPassword,
    };

    let result = await axios({
      url: "http://localhost:3000/signup",
      method: "post",
      data: user,
    });
    if (result.data.redmessage) {
      setRedMessage(result.data.redmessage);
      closeErrorWindowTime;
    } else {
      setGreenMessage(result.data.greenmessage);
      setTimeout(() => {
        navigate('/') 
      }, 3000)
    }
  };

  return (
    <div>
      {/* ERROR WINDOW */}
      {redMessage === "" ? (
        ""
      ) : (
        <RedalertElement redmessage={redMessage} onClick={closeErrorWindow} />
      )}

      {/* GREEN MESSAGE WINDOWS */}
      {greenMessage === '' ? '' : <GreenalertElement greenmessage={greenMessage} onClick={closeErrorWindow} />}

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
            Registra tu cuenta
          </h2>
        </div>
        {/* SIGNUP FORM */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <FormInputElement
                id={"nombre"}
                name={"nombre"}
                type={"text"}
                autoComplete={"text"}
                onChange={setNombre}
                htmlFor="nombre"
                children="Nombre"
              />
            </div>

            <div>
              <FormInputElement
                id={"apellidos"}
                name={"apellidos"}
                type={"text"}
                autoComplete={"text"}
                onChange={setApellidos}
                htmlFor="apellidos"
                children="Apellidos"
              />
            </div>

            <div>
            <FormInputElement
                id={"email"}
                name={"email"}
                type={"email"}
                autoComplete={"email"}
                onChange={setEmail}
                htmlFor="email"
                children="Email"
              />
            </div>

            <div>
            <FormInputElement
                id={"contrasena"}
                name={"contrasena"}
                type={"password"}
                autoComplete={"current-password"}
                onChange={setPassword}
                htmlFor={"contrasena"}
                children="Contraseña"
              />
            </div>

            <div>
            <FormInputElement
                id={"confirmarcontrasena"}
                name={"confirmarcontrasena"}
                type={"password"}
                autoComplete={"current-password"}
                onChange={setConfirmPassword}
                htmlFor={"confirmarcontrasena"}
                children="Confirmar Contraseña"
              />
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if(validator.isEmail(email)){
                    registerUser()
                  } else {
                    setRedMessage('Introduzca un email válido')
                  };
                  
                }}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
