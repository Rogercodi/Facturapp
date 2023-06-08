import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import FormInputElement from "./elements/FormInputElement";
import GreenalertElement from "./elements/GreenalertElement";
import RedalertElement from "./elements/Redalert-element";
import { FacturappContext, FacturappContextType } from "../context/Context";
import bcrypt from "bcryptjs";


function RecoveryForm() {
  //CONTEXT
  const {
    redMessage,
    setRedMessage,
    greenMessage,
    setGreenMessage,
    closeErrorWindow,
    axiosCall
  } = useContext(FacturappContext) as FacturappContextType;

  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [respuestaFrom, setRespuestaFrom] = useState("");
  const [checkedHash, setCheckedHash] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  
  //CHECK IF USER
  const handleRecovery = () => {
    let data = { email };
    axiosCall('/recover', 'post', data)
      .then((result) => {
        if (result.data.redmessage) {
          setRedMessage(result.data.redmessage);
        } else {
          setGreenMessage(result.data.greenmessage);
          setUserEmail(email);
          setPregunta(result.data.result[0].pregunta);
          setRespuesta(result.data.result[0].respuesta);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

  //CHECK SECURITY ANSWER
  const checkAnswer = async () => {
    let checkAnswer = await bcrypt.compare(respuestaFrom, respuesta);
    if (checkAnswer) {
      setCheckedHash(true);
      setGreenMessage('Respuesta correcta')
    } else {
      setRedMessage('Respuesta incorrecta')
    }
  };

  //SET NEW PASSWORD
  const setNewPassword = () =>{
    let data = {
      email,
      password
    };
    axiosCall('/setnewpassword', 'post', data)
      .then((result) => {
        if(result.data.greenmessage){
          setGreenMessage(result.data.greenmessage);
          navigate('/signin');
        } else {
          setRedMessage(result.data.redmessage)
        }
      })
    .catch((err) => {
      console.log(err)
    })
    }

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

      <h1 className="flex justify-center text-5xl mt-10 font-bold">
        Recuperación de usuario
      </h1>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to={"/"}>
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </Link>
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

            {userEmail !== "" ? (
              <div>
                <div className="mb-6">
                  <h2 className="block text-sm font-medium leading-6 text-gray-900">
                    Pregunta de Seguridad
                  </h2>
                  <div
                    id="IVA"
                    className=" block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {pregunta}
                  </div>
                </div>
                <div>
                  <FormInputElement
                    id={"respuesta"}
                    name={"respuesta"}
                    type={"text"}
                    autoComplete={""}
                    onChange={setRespuestaFrom}
                    htmlFor={"respuesta"}
                    children={"Respuesta de Seguridad"}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {checkedHash ? (
              <>
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
              </>
            ) : (
              ""
            )}

            {userEmail === "" ? (
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (!validator.isEmail(email)) {
                      setRedMessage("Introduzca un email válido");
                    } else {
                      handleRecovery();
                    }
                  }}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Buscar usuario
                </button>
              </div>
            ) : checkedHash === false ? (
              <div>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    checkAnswer();
                  }}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Comprobar Respuesta
                </button>
              </div>
            ) : <div>
            <button
              onClick={async (e) => {
                e.preventDefault();
                setNewPassword();
              }}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cambiar Contraseña
            </button>
          </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecoveryForm;
