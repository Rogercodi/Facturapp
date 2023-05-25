import axios from "axios";
import { useState} from "react";
import { IInvoice } from "../../../../backend/src/app-types/invoice-type";


function InvoiceForm() {
  const [base, setBase] = useState(0);
  const [iva, setIva] = useState(0);
  const [irpf, setIrpf] = useState(0);
  const [body, setBody] = useState("");
  const [fecha, setFecha] = useState("");
  const [totalIva, setTotalIva] = useState(0);
  const [totalIrpf, setTotalIrpf] = useState(0);
  const [total, setTotal] = useState(0);

  const confirmData = () => {

    setTotalIva(parseFloat(document.querySelector('#IVA').innerHTML));
    setTotalIrpf(parseFloat(document.querySelector('#IRPF')?.innerHTML));
    setTotal(parseFloat(document.querySelector('#TOTAL')?.innerHTML));
  }

  const handleSubmit = async () => {
  

    let invoice: IInvoice = {
      base,
      iva,
      totalIva,
      irpf,
      totalIrpf,
      body,
      fecha,
      total
    }

    let result = await axios({
      method: 'post',
      url: 'http://localhost:3000/user/newinvoice',
      data: invoice,
      timeout: 1000
    })
    console.log(result)
  }

  return (
    <div>
      <div className="">
        <h1 className="text-4xl font-bold p-4">Factura</h1>
       

        <h3 className="font-bold">R</h3>
        <h4>7</h4>
        <h4>C</h4>
        <h4>2d'Urgell</h4>
        <h4>gul.com</h4>
      </div>

     
      {/* IVA*/}
      <div className="flex mt-10">
        <select
          onChange={(e) => {
            setIva(parseFloat(e.target.value));
          }}
          className="border-2 mb-4 ml-4"
          name="iva"
          id="iva"
          
        >
          <option selected>IVA aplicable</option>
          <option value="10">10%</option>
          <option value="21">21%</option>
        </select>
        <div id="IVA" className="w-1/12 border-2 mb-4 ml-4 min-h-min">
        {base === 0 ? 0 : (base * iva) / 100}
        </div>
      </div>

      {/* IRPF */}
      <div className="flex">
        <select
          onChange={(e) => {
            setIrpf(parseFloat(e.target.value));
          }}
          className="border-2 mb-4 ml-4"
          name="iva"
          id="iva"
        >
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
        <div id="IRPF" className="w-1/12 border-2 mb-4 ml-4 min-h-min">
          { base * irpf / 100}
        </div>
      
      </div>

      {/* FECHA */}
      <div className="flex">
        <h2 className="text-xl  ml-4">Fecha</h2>
        <input
          onChange={(e) => {
            setFecha(e.target.value);
          }}
          type="date"
          className="border-2 mb-4 ml-4"
        ></input>
      </div>

       {/* BASE */}
       <div className=" ">
        <input
          onChange={(e) => {
            e.preventDefault(), setBase(parseFloat(e.target.value));
          }}
          className="border-2 mb-4 ml-4 w-1/12 text-center"
          type="text"
          placeholder="base imponible €"
        />
      </div>

      {/* CONCEPTO */}
      <div>
        <textarea
          onChange={(e) => {
            e.preventDefault(), setBody(e.target.value);
          }}
          className="border-2 mb-4 ml-4"
          name="body"
          id="body"
          placeholder="Concepto"
        ></textarea>
      </div>
      {/* TOTAL */}
      <div className="flex">
        <a className="ml-4">Total</a>
        <div id="TOTAL" className="w-1/12 border-2 mb-4 ml-4 min-h-min">
          {base === 0
            ? 0
            : (
                base +
                parseFloat(document.querySelector("#IVA")?.innerHTML) -
                parseFloat(document.querySelector("#IRPF")?.innerHTML)
              ).toFixed(2)}
          €
        </div>
      </div>

      <button
      onClick={confirmData}
      className="btn m-4" type="submit">Confirmar Datos</button>
        <button
      onClick={handleSubmit}
      className="btn" type="submit">Generar Factura</button>
    </div>
  );
}

export default InvoiceForm;
