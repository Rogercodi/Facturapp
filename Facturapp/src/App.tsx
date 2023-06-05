
import { useContext } from "react";
import { FacturappContext, FacturappContextType } from "./context/Context";
import RedalertElement from "./components/elements/Redalert-element";
import GreenalertElement from "./components/elements/GreenalertElement";

function App() {

  const { name, greenMessage, redMessage, closeErrorWindow } = useContext(FacturappContext) as FacturappContextType
  
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
      <h1 className="text-center text-4xl">Bienvenido {name}</h1> 
    </div>
    
  );
}

export default App;
