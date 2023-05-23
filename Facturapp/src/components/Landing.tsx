
import { Link, Outlet } from 'react-router-dom'
import { UserAppI } from "../../../backend/src/Repositories/User";
import axios from 'axios';

function Landing() {
  
const reqUser = async():Promise<UserAppI>  => {
  let data = await axios({
    url: 'http://localhost:3000/getuser',
    method: 'post',
    data: {email: 'roger@test.com'}
  })
  let user = data.data
  console.log(user)
  return user
}
  
    return (
    <div>
        <h1
        className='flex justify-center text-5xl mt-10 font-bold'
        >Bienvenido/a a Facturapp!</h1>

<div className='flex justify-evenly mt-20 '>
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Iniciar Sesion
</button>
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Registrarse
</button>

<Link to={'/user'} ><button 
onClick={reqUser}
className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button></Link>
</div>
 
    <Outlet />
    </div>
  )
}

export default Landing