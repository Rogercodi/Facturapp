import { useState, useEffect } from "react";

function InvoiceForm() {

const [base, setBase] = useState('');
const [iva, setIva] = useState('');
const [irpf, setIrpf] = useState('');
const [body, setBody] = useState('');
const [fecha, setFecha] = useState('')



  return (
    <div>
      <div className="">
        <h1 className="text-4xl font-bold p-4">Factura</h1>
        <h2 className="text-3xl pt-4 ml-4">Fecha</h2>
        <input 
        onChange={(e) => {
          setFecha(e.target.value)
        }}
        type="date" className="border-2 mb-4 ml-4"></input>

        <h3 className="font-bold">R</h3>
        <h4>7</h4>
        <h4>C</h4>
        <h4>2d'Urgell</h4>
        <h4>gul.com</h4>
      </div>

    {/* BASE */}
      <div className=" w-1/6 mt-10">
        <input
          onChange={(e) => {
            e.preventDefault(),
            setBase(e.target.value)
          }}
          className="border-2 mb-4 ml-4"
          type="text"
          placeholder="base imponible €"
          
        />

        </div>
{/* IVA*/}
        <div className="flex">
          <select onChange={(e) => {
            setIva(e.target.value)
          }} className="border-2 mb-4 ml-4" name="iva" id="iva">
          <option selected>IVA aplicable</option>
          <option value="10">10%</option>
          <option value="21">21%</option>
        </select>
        <div id="IVA" className="w-1/12 border-2 mb-4 ml-4 min-h-min" >{parseInt(base) * parseInt(iva) / 100}
        </div>

        {/* <input name="IVA" id="IVA" 
       value={(parseInt(base) * parseInt(iva)) / 100} 
       onChange={()=> {
        console.log('onchange')
        setTotalIrpf(document.querySelector("#IVA")?.value)
       }}
       className="border-2 mb-4 ml-4" type="text" ></input> */}
        </div>
        
{/* IRPF */}
        <div className="flex">
        <select onChange={(e) => {
            
            setIrpf(e.target.value)
          }} 
          className="border-2 mb-4 ml-4" name="iva" id="iva">
          <option selected>IRPF aplicable</option>
          <option value="2">2%</option>
          <option value="3">3%</option>
          <option value="4">4%</option>
          <option value="5">5%</option>
          <option value="6">6%</option>
          <option value="7">7%</option>
          <option value="8">8%</option>
          <option value="9">9%</option>
          <option value="10">10%</option>
          <option value="11">11%</option>
          <option value="12">12%</option>
          <option value="13">13%</option>
        </select>
        <div id="IRPF" className="w-1/12 border-2 mb-4 ml-4 min-h-min" >{((parseInt(base) * parseInt(irpf)) / 100)}
        </div>
        {/* <input id='IRPF' value={(parseFloat(base) * parseFloat(irpf)) / 100} className="border-2 mb-4 ml-4" type="text" /> */}
        </div>

        {/* CONCEPTO */}
      <div>
        <textarea onChange={(e) => {
            e.preventDefault(),
            setBody(e.target.value)
          }} className="border-2 mb-4 ml-4" name="body" id="body"  placeholder="Concepto"></textarea>
      </div>
{/* TOTAL */}
      <div className="flex">        
        <a className="ml-4">Total</a><div className="w-1/12 border-2 mb-4 ml-4 min-h-min" >{(parseFloat(base) + parseFloat(document.querySelector("#IVA")?.innerHTML) - parseFloat(document.querySelector("#IRPF")?.innerHTML)).toFixed(2) }€</div>
      </div>
      
      <button type="submit">Generar Factura</button>
          </div>
    
  );
}

export default InvoiceForm;

