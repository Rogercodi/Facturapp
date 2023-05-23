
import { useContext } from "react";
import { facturappContext } from "./components/context/Context";

function App() {

  const { username } = useContext(facturappContext)
  return (
    <div>
      <h1 className="text-center text-4xl">Bienvenido NOMBRE</h1>
      {username}
      {'hola'}
    </div>
  );
}

export default App;
