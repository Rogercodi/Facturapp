import { useState } from "react";

function InvoiceForm() {

const [base, setBase] = useState('');
const [iva, setIva] = useState('');
const [irpf, setIrpf] = useState('');
const [body, setBody] = useState('');
const [totalIva, setTotalIva] = useState('');
const [totalIrpf, setTotalIrpf] = useState('');


  return (
    <div>
      <div className="">
        <h1 className="text-4xl font-bold p-4">Factura</h1>
        <h2 className="text-3xl pt-4 ml-4">Fecha</h2>
        <input type="date" className="border-2 mb-4 ml-4"></input>

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
{/* IVA */}        
        <div>
          <select onChange={(e) => {
            e.preventDefault(),
            setIva(e.target.value)
          }} className="border-2 mb-4 ml-4" name="iva" id="iva">
          <option selected>IVA aplicable</option>
          <option value="10">10%</option>
          <option value="21">21%</option>
        </select>
        <input id="iva" 
        onChange={(e) => {
          e.preventDefault();
          setTotalIva(e.target.value)
        }} value={(parseInt(base) * parseInt(iva)) / 100} className="border-2 mb-4 ml-4" type="text" readOnly/>
        </div>
{/* IRPF */}
        <div>
        <select onChange={(e) => {
            e.preventDefault(),
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
       
        <input id='irpf' value={(parseInt(base) * parseInt(irpf)) / 100} className="border-2 mb-4 ml-4" type="text" />
        </div>
      <div>
        <textarea onChange={(e) => {
            e.preventDefault(),
            setBody(e.target.value)
          }} className="border-2 mb-4 ml-4" name="body" id="body" cols="30" rows="4" placeholder="Concepto"></textarea>
      </div>

      <div>
        <a className="ml-4">Total</a><input value={(document.getElementById(iva))} className="border-2 mb-4 ml-4" type="number" readOnly />
      </div>
      
      <button type="submit">Generar Factura</button>
    </div>
  );
}

export default InvoiceForm;
