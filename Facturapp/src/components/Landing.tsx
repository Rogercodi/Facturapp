
import { Outlet } from 'react-router-dom'


function Landing() {
  
//   const navigate = useNavigate()
  
    return (
    <div>
        <h1
        className='flex justify-center text-5xl mt-10 font-bold'
        >Bienvenido/a a Facturapp!</h1>
 
    <Outlet />
    </div>
  )
}

export default Landing