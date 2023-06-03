import React, { useContext, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FacturappContext, FacturappContextType } from '../context/Context';
import { UserAppI } from "../../../backend/src/app-types/user-types";
import RedalertElement from './elements/Redalert-element';
function Signin() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('')
const navigate = useNavigate();

const {setIduser, setAddress, setBanknumber, setCity, setCp, setDni, setEmailapp, setName, setSurname } = useContext(FacturappContext) as FacturappContextType;

const handleLogin = async () => {
  let data = {
    email,
    password
  };

  let result = await axios({
    url: 'http://localhost:3000/signin',
    method: 'post',
    data: data
  })
  
  let user:UserAppI = result.data.appUser;
  let {address, banknumber, city,cp, dni,iduser,name,surname,} = user
  

  if(!user){
    console.log('Axios: usuario no encontrado')
  } else {
    console.log(user)
    setName(name),
    setSurname(surname),
    setDni(dni),
    setAddress(address),
    setBanknumber(banknumber),
    setCp(cp),
    setIduser(iduser),
    setCity(city),
    setEmailapp(email),
    setTimeout(() => navigate('/user'), 500)
  }

}



  return (
    <div>
      {/* {redMessage === '' ? '' : <RedalertElement redmessage={redMessage} onClick={clickError} />} */}
      <h1 className="flex justify-center text-5xl mt-10 font-bold">
        Bienvenido/a a Facturapp!
      </h1>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Acceder a tu cuenta</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" method='post' >
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo electrónico</label>
        <div className="mt-2">
          <input onChange={(e)=> setEmail(e.target.value)} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Has olvidado la contraseña?</a>
          </div>
        </div>
        <div className="mt-2">
          <input onChange={(e)=> setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <button
        onClick={(e) => {
          e.preventDefault(),
          handleLogin()
        }}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Iniciar Sesión</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Aún no estás registrado? 
      <Link to={'/signup'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">   Hazlo en un solo paso!</Link>
    </p>
  </div>
</div>
</div>
  )
}

export default Signin