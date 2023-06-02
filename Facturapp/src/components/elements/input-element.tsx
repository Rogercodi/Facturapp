import React, { ChangeEvent } from 'react'
import { ReactNode } from 'react';

interface props {
    children?: ReactNode;
    onChange(data: any): void;
    value?: string;
    id: string;
    type: string
  }

 

function InputForm({onChange, value, id, type}: props) {



  return (
    <input 
    className='border-2 mt-4 px-2 py-1 border-black rounded-md text-center' 
    type={type}
    value={value}
    id={id}
    onChange={(e: React.ChangeEvent <HTMLInputElement>) => {
        e.preventDefault(),
        onChange(e.target.value)
    }}  />
  )
}

export default InputForm