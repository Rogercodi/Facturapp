import { Link, Outlet, useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
 

  return (
    <div className="">
      <h1 className="flex justify-center text-5xl mt-10 font-bold">
        Bienvenido/a a Facturapp!
      </h1>
    <p className=" w-1/2 text-justify text-xl mx-auto mt-8">Facturapp es una aplicación gratuita de contabilidad pensada para 
      actuaciones musicales con la que podrás llevar tu contabilidad de manera muy fácil y cómoda.
       Además de tus datos y tus facturas, podrás mantener en registro a tus pagadores con el fin 
       de hacer llegar las facturasal destinatario con un solo click </p>
      <div className="flex justify-evenly mt-20 ">
        <button
        onClick={()=>{navigate('/signin')}}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Iniciar Sesion
        </button>
        <button 
        onClick={() => navigate('/signup')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Registrarse
        </button>

        
      </div>

      <Outlet />
    </div>
  );
}

export default Landing;
