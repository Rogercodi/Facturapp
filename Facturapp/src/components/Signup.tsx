import axios from "axios"
import { useState } from "react";

function Signup() {

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const registerUser = async() => {
        let user = {
            nombre,
            apellidos,
            email,
            password,
            confirmPassword
        }
        console.log('hola')
        let result = await axios({
          url: 'http://localhost:3000/signup',
          method: 'post',
          data: user
        })
        console.log(result)
       
    }

  return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registrar tu cuenta</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" >
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
        <div className="mt-2">
          <input onChange={(e)=> setNombre(e.target.value)} id="nombre" name="nombre" type="text" autoComplete="text"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Apellidos</label>
        <div className="mt-2">
          <input id="apellidos" onChange={(e)=> setApellidos(e.target.value)} name="apellidos" type="text" autoComplete="text"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo electrónico</label>
        <div className="mt-2">
          <input id="email" onChange={(e)=> setEmail(e.target.value)} name="email" type="email" autoComplete="email"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
        <div className="mt-2">
          <input onChange={(e)=> setPassword(e.target.value)} id="password" name="password" type="password"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirmar contraseña</label>
          
        </div>
        <div className="mt-2">
          <input onChange={(e)=> setConfirmPassword(e.target.value)} id="confirmpassword" name="confirmpassword" type="password" autoComplete="current-password"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <button 
        type="submit" 
        onClick={(e) => {
          e.preventDefault();
          registerUser()
        }}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrarse</button>
      </div>
    </form>

  </div>
</div>
  )
}

export default Signup