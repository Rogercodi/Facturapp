import axios from "axios";
import { useContext, useState } from "react";
import { IInvoice } from "../../../../backend/src/app-types/invoice-type";
import { FacturappContext, FacturappContextType } from "../../context/Context";
import { IAppInvoice } from "../../../../backend/src/app-types/invoice-type";
import { IPayer } from "../../../../backend/src/app-types/payer-type";

function InvoiceForm() {
  const [base, setBase] = useState(0);
  const [iva, setIva] = useState(0);
  const [irpf, setIrpf] = useState(0);
  const [body, setBody] = useState("");
  const [fecha, setFecha] = useState("");
  const [totaliva, setTotalIva] = useState(0);
  const [totalirpf, setTotalIrpf] = useState(0);
  const [total, setTotal] = useState(0);
  const [idpayer, setIdpayer] = useState(0)
  

  const { name, surname, address, city, dni, emailApp, cp,banknumber, iduser, payers } =
    useContext(FacturappContext) as FacturappContextType;
  const idusuario = iduser;

  const confirmData = () => {
    setTotalIva(parseFloat(document.querySelector("#IVA").innerHTML));
    setTotalIrpf(parseFloat(document.querySelector("#IRPF")?.innerHTML));
    setTotal(parseFloat(document.querySelector("#TOTAL")?.innerHTML));
  };

  const handleSubmit = async () => {
    let invoice: IAppInvoice = {
      base,
      iva,
      totaliva,
      irpf,
      totalirpf,
      body,
      fecha,
      total,
      idpayer,
      idusuario,
      
    };

    let result = await axios({
      method: "post",
      url: "http://localhost:3000/user/newinvoice",
      data: invoice,
      timeout: 200,
    });
    console.log(result);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold py-4 flex justify-center">Factura</h1>
      <div className="flex justify-evenly my-10">
      <div className="px-4">
        

        <h3 className="font-bold">
          {name} {surname}
        </h3>
        <h4>{dni}</h4>
        <h4>{address}</h4>
        <h4>
          {city} {cp}
        </h4>
        <h4>{emailApp}</h4>
        <h4>{banknumber}</h4>
      </div>
      {/* PAYER*/}
      <div className="flex mt-10">
        
        <select
          onChange={(e) => {
            setIdpayer(parseFloat(e.target.value));
          }}
          className="border-2 mb-4 ml-4 bg-white"
          name="payer"
          id="payer"
          typeof="number"
         
        >
          <option value="">Selecciona un pagador</option>
          {payers.map((payer: IPayer) => {
            return (
              <option value={payer.idpayer}>
                <h4>{payer.nombre + ' ' + payer.apellidos}</h4>
              </option>
            )
          })}
        </select>
      </div>
      </div>

      {/* IVA*/}
      <div className="flex">
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
          {(base * irpf) / 100}
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

      <button onClick={confirmData} className="btn m-4" type="submit">
        Confirmar Datos
      </button>
      <button onClick={handleSubmit} className="btn" type="submit">
        Generar Factura
      </button>
    </div>
  );
}

export default InvoiceForm;
