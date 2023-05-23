import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

interface context {
    username: string
}

export const facturappContext = createContext<context | null>(null)

export function FacturappContextProvider(): any {
    const [name, setName] = useState('Roger')
    return(
        <facturappContext.Provider
        value={{
            username: name
        }}
        >

        <Outlet />
        </facturappContext.Provider>
    )

}