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

    const [name, setName] = useState<string>('testcontext');

    return(
        <FacturappContext.Provider 
        value={{name, setName}}
        >
        <Outlet />
        {children}
        
        </FacturappContext.Provider>

    )
}