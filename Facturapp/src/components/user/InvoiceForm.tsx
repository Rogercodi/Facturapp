import { useContext, useEffect, useRef, useState } from "react";
import { IAppInvoice } from "../../../../backend/src/app-types/invoice-type";
import { IAppPayer } from "../../../../backend/src/app-types/payer-type";
import { FacturappContext } from "../../context/Context";
import InvoiceWeb from "../invoice/InvoiceWeb";
import ReactToPrint from "react-to-print";
import { Navigate, useNavigate } from "react-router-dom";
import RedalertElement from "../elements/Redalert-element";
import GreenalertElement from "../elements/GreenalertElement";
import { FacturappContextType } from "../Types/Context-Type";
import ReactPDF from "@react-pdf/renderer";

function InvoiceForm() {
  

  //CONTEXT
  const {
    name,
    surname,
    address,
    city,
    dni,
    emailapp,
    cp,
    banknumber,
    iduser,
    payers,
    setGreenMessage,
    setRedMessage,
    greenMessage,
    redMessage,
    closeErrorWindow,
    protectRoute,
    axiosCall,
    updateInvoice,
    setUpdateInvoice
  } = useContext(FacturappContext) as FacturappContextType;

  const [idinvoice, setIdinvoice] = useState<number | undefined>(updateInvoice?.idinvoice || 0);
  const [numero, setNumero] = useState(updateInvoice?.numero || "");
  const [base, setBase] = useState(updateInvoice?.base || 0);
  const [iva, setIva] = useState(updateInvoice?.iva  || 0);
  const [irpf, setIrpf] = useState(updateInvoice?.irpf || 0);
  const [body, setBody] = useState(updateInvoice?.body || "");
  const [fecha, setFecha] = useState(updateInvoice?.fecha || "");
  const [totaliva, setTotalIva] = useState(updateInvoice?.totaliva || 0);
  const [totalirpf, setTotalIrpf] = useState(updateInvoice?.totalirpf || 0);
  const [total, setTotal] = useState(updateInvoice?.total || 0);
  const [idpayer, setIdpayer] = useState(updateInvoice?.idpayer || 0);
  const [pnombre, setPnombre] = useState(updateInvoice?.nombre || "");
  const [papellidos, setPapellidos] = useState(updateInvoice?.apellidos || '');
  const [pemail, setPemail] = useState(updateInvoice?.email || "");
  const [pnif, setPnif] = useState(updateInvoice?.nif || "");
  const [pdomicilio, setPdomicilio] = useState(updateInvoice?.domicilio || "");
  const [pcp, setPcp] = useState(updateInvoice?.cp || "");
  const [ppoblacion, setPpoblacion] = useState(updateInvoice?.poblacion || "");
  const [verWeb, setVerWeb] = useState(false);

  const idusuario = iduser;
  const navigate = useNavigate();

  //SELECT PAYER
  useEffect(() => {
    if (idpayer > 0) {
      payers.map((payer: IAppPayer) => {
        if (idpayer === payer.idpayer) {
          setPnombre(payer.nombre);
          setPapellidos(payer.apellidos);
          setPemail(payer.email);
          setPnif(payer.nif);
          setPdomicilio(payer.domicilio);
          setPpoblacion(payer.poblacion);
          setPcp(payer.cp);
        }
      });
    }
  }, [idpayer]);

  //SET TAXES
  useEffect(() => {
    setTotalIva(parseFloat(document.querySelector("#IVA")?.innerHTML || ""));
    setTotalIrpf(parseFloat(document.querySelector("#IRPF")?.innerHTML || ""));
  }, [iva, irpf, total]);

  //SET TOTAL
  useEffect(() => {
    setTotal(
      base +
        parseFloat(document.querySelector("#IVA")?.innerHTML || "") -
        parseFloat(document.querySelector("#IRPF")?.innerHTML || "")
    );
  }, [base, totaliva, totalirpf]);

  //NEW INVOICE
  const newInvoice = () => {
    let invoice: IAppInvoice = {
      numero,
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

    axiosCall("/user/newinvoice", "post", invoice)
      .then((result) => {
        if (result.data.greenmessage) {
          setGreenMessage(result.data.greenmessage);
          navigate("/user");
        } else {
          setRedMessage(result.data.redmessage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateInv = () => {
    let invoice: IAppInvoice = {
      idinvoice,
      numero,
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

    axiosCall("/user/updateinvoice", "put", invoice)
      .then((result) => {
        if (result.data.greenmessage) {
          setGreenMessage(result.data.greenmessage);
          setUpdateInvoice(null)
          navigate("/user");
        } else {
          setRedMessage(result.data.redmessage);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

  // PDF GENERATOR
  const componentRef: any = useRef();

  protectRoute();

  return (
    <>
      <div>
         {/* MESSAGES */}
        <div className="messages">
         
          {redMessage === "" ? (
            ""
          ) : (
            <RedalertElement
              redmessage={redMessage}
              onClick={closeErrorWindow}
            />
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
        <h1 className="text-4xl font-bold py-4 flex justify-center">Factura</h1>
       
        {/* USER PAYER DATA */}
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
            <h4>{emailapp}</h4>
            <h4>{banknumber}</h4>
          </div>

          {/* PAYER*/}
          <div className="flex">
            <select
              onChange={(e) => {
                setIdpayer(parseFloat(e.target.value));
                // handlePayer()
              }}
              className="border-2 mb-4 ml-4 bg-white"
              name="payer"
              id="payer"
              typeof="number"
            >
              <option value="">Selecciona un pagador</option>
              {payers.map((payer: IAppPayer) => {
                return (
                  <option value={payer.idpayer}>
                    <h4>{payer.nombre + " " + payer.apellidos}</h4>
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <h3 className="font-bold">
              {pnombre} {papellidos}
            </h3>
            <h4>{pnif}</h4>
            <h4>{pdomicilio}</h4>
            <h4>
              {ppoblacion} {pcp}
            </h4>
            <h4>{pemail}</h4>
          </div>
        </div>

        {/* FECHA */}
        <div className="flex justify-evenly">
         
          <div>
            <h2 className="text-xl   ml-4">Fecha</h2>
            <input
              onChange={(e) => {
                let date = e.target.value;
                date = date.split('-').reverse().join('-')
                setFecha(date);
              }}
              type="date"
              className="rounded-lg mb-4 ml-4 px-2 border-2 border-solid border-slate-400"
              value={fecha || ''}
            ></input>
          </div>
          <div>
            <h2 className="text-xl   ml-4">Número de factura</h2>
            <input
              onChange={(e) => {
                setNumero(e.target.value);
              }}
              type="text"
              className="rounded-lg mb-4 ml-4 px-2 border-2 border-solid border-slate-400"
              value={numero}
            />
          </div>
        </div>

        {/* CONCEPTO */}
        <div className="flex justify-center">
          <textarea
            onChange={(e) => {
              e.preventDefault(), setBody(e.target.value);
            }}
            className="border-2 border-solid border-slate-400 text-center rounded-lg px-4 py-2 mb-4 "
            name="body"
            id="body"
            placeholder="Concepto"
            value={body || ''}
            cols={70}
          ></textarea>
        </div>

        {/* BASE */}
        <div className="flex justify-center">
          <input
            onChange={(e) => {
              e.preventDefault(), setBase(parseFloat(e.target.value));
            }}
            className="border-2 border-solid border-slate-400 rounded-lg mb-4 ml-4 w-1/6 text-center py-1"
            type="text"
            value={base || ''}
            placeholder="base imponible €"
          />
        </div>

        {/* IVA*/}
        <div className="flex justify-center">
          <select
            onChange={(e) => {
              setIva(parseFloat(e.target.value));
            }}
            className="border-2 mb-4  border-solid border-slate-400 rounded-lg "
            value={iva || ''}
            name="iva"
            id="iva"
          >
            <option selected>IVA aplicable</option>
            <option value="10">10%</option>
            <option value="21">21%</option>
          </select>
          <div
            id="IVA"
            className="w-1/12 border-2 mb-4 ml-4 bg-slate-300 px-2 min-h-min rounded-lg"
          >
            {base === 0 ? 0 : (base * iva) / 100}
          </div>
        </div>

        {/* IRPF */}
        <div className="flex justify-center">
          <select
            onChange={(e) => {
              setIrpf(parseFloat(e.target.value));
            }}
            className="border-2 border-solid border-slate-400 mb-4 rounded-lg"
            name="iva"
            id="irpf"
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
            <option value="14">14%</option>
            <option value="15">15%</option>
            <option value="16">16%</option>
            <option value="17">17%</option>
            <option value="18">18%</option>
          </select>
          <div
            id="IRPF"
            className="w-1/12 border-2 mb-4 px-2 bg-slate-300 min-h-min rounded-lg ml-3"
          >
            {(base * irpf) / 100}
          </div>
        </div>

        {/* TOTAL */}
        <div className="flex justify-center mt-2 ">
          <p className="ml-4 font-bold">TOTAL</p>
          <div
            id="TOTAL"
            className="w-1/12 mb-4 ml-4 min-h-min border-2 border-solid border-slate-400 px-2 rounded-lg"
          >
            {total}€
          </div>
        </div>

        {/* GENERATE INVOICE BUTTONS*/}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded m-2"
            onClick={() => {
              setVerWeb(!verWeb);
            }}
          >
            {verWeb ? "Ocultar Factura" : "Previsualizar Factura"}
          </button>
          <button
            onClick={updateInvoice === null ? newInvoice : updateInv}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded m-2"
            type="submit"
          >
            {updateInvoice !== null ? 'Actualizar Factura' : 'Guardar Factura'}
          </button>
        </div>
      </div>

      {/* INVOICE WEB */}
      <div ref={componentRef} className="invoiceweb">
        {verWeb ? (
          <InvoiceWeb
            numero={numero}
            base={base}
            iva={iva}
            totaliva={totaliva}
            irpf={irpf}
            totalirpf={totalirpf}
            body={body}
            fecha={fecha}
            total={total}
            user={{
              name,
              surname,
              dni,
              address,
              cp,
              city,
              emailapp,
              banknumber,
              iduser,
            }}
            pnombre={pnombre}
            papellidos={papellidos}
            pemail={pemail}
            pnif={pnif}
            pdomicilio={pdomicilio}
            ppoblacion={ppoblacion}
            pcp={pcp}
          />
        ) : (
          ""
        )}
      </div>
      
      {/* PDF BUTTON */}
      {verWeb ? (
        <div className="flex justify-center mt-10">
          <ReactToPrint
            trigger={() => (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded m-2">
                Descargar / Imprimir
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      ) : (
        " "
      )}
    </>
  );
}

export default InvoiceForm;
