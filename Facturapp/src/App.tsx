
import { useContext } from "react";
import { FacturappContext, FacturappContextType } from "./context/Context";
import RedalertElement from "./components/elements/Redalert-element";
import GreenalertElement from "./components/elements/GreenalertElement";
import { Navigate } from "react-router-dom";

function App() {

  const { name, greenMessage, redMessage, closeErrorWindow, setRedMessage } = useContext(FacturappContext) as FacturappContextType;
  
  if(name === ''){
    setRedMessage('Ruta protegida. Inicie sesión')
    return <Navigate  to={'/signin'} />
  }


  return (
<>
<div className="messages">
      {/* ERROR WINDOW */}
      {redMessage === "" ? (
        ""
      ) : (
        <RedalertElement redmessage={redMessage} onClick={closeErrorWindow} />
      )}

      {/* GREEN MESSAGE WINDOWS */}
      {greenMessage === '' ? '' : <GreenalertElement greenmessage={greenMessage} onClick={closeErrorWindow} />}
     
    </div>
     <h1 className="text-center text-4xl mt-6">Bienvenido {name}</h1> 
    </>
  );
}

export default App;
