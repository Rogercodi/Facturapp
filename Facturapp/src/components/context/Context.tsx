import { ReactNode, createContext, useState } from "react";
import { Outlet } from "react-router-dom";

interface props {
    children: ReactNode
}

export type FacturappContextType = {
    name: string,
    setName: (value: string) => void
}

export const FacturappContext = createContext({})

export function FacturappContextProvider({children}: props){
    const [iduser, setIduser] = useState<number>(0);
    const [name, setName] = useState<string>('testcontext');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [dni, setDni] = useState<string>('');
    const [address, setaddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [cp, setCp] = useState<number>(0);
    const [bankNumber, setBankNumber] = useState<string>('');


    return(
        <FacturappContext.Provider 
        value={{name, setName}}
        >
        <Outlet />
        {children}
        
        </FacturappContext.Provider>

    )
}