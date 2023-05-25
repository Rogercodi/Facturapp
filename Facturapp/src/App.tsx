
import { useContext } from "react";
import { FacturappContext, FacturappContextType } from "./context/Context";

function App() {

  const { name, setName } = useContext(FacturappContext) as FacturappContextType
  
  console.log(name)
  return (
    <div>
      <h1 className="text-center text-4xl">Bienvenido {name}</h1>
      <button
      onClick={()=> {
        setName('Roger')
      }}
      >CLICK ME</button>
      
    </div>
  );
}

export default App;
