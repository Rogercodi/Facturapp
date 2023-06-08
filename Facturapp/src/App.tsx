import { useContext } from "react";
import { FacturappContext } from "./context/Context";
import { FacturappContextType } from "./components/Types/Context-Type";
import RedalertElement from "./components/elements/Redalert-element";
import GreenalertElement from "./components/elements/GreenalertElement";

function App() {
  //CONTEXT
  const {
    name,
    greenMessage,
    redMessage,
    closeErrorWindow,
    setRedMessage,
    protectRoute,
  } = useContext(FacturappContext) as FacturappContextType;

  protectRoute();

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
        {greenMessage === "" ? (
          ""
        ) : (
          <GreenalertElement
            greenmessage={greenMessage}
            onClick={closeErrorWindow}
          />
        )}
      </div>
      <h1 className="text-center text-4xl mt-6">Bienvenido {name}</h1>
    </>
  );
}

export default App;
