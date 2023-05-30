
import { useContext } from "react";
import { FacturappContext, FacturappContextType } from "./context/Context";

function App() {

  const { name } = useContext(FacturappContext) as FacturappContextType
  
  return (
    <div>
      <h1 className="text-center text-4xl">Bienvenido {name}</h1>
      
    </div>
  );
}

export default App;
