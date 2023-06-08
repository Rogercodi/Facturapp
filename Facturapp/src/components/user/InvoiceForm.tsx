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

function InvoiceForm() {
  const [base, setBase] = useState(0);
  const [iva, setIva] = useState(0);
  const [irpf, setIrpf] = useState(0);
  const [body, setBody] = useState("");
  const [fecha, setFecha] = useState("");
  const [totaliva, setTotalIva] = useState(0);
  const [totalirpf, setTotalIrpf] = useState(0);
  const [total, setTotal] = useState(0);
  const [idpayer, setIdpayer] = useState(0);
  const [pnombre, setPnombre] = useState("");
  const [papellidos, setPapellidos] = useState("");
  const [pemail, setPemail] = useState("");
  const [pnif, setPnif] = useState("");
  const [pdomicilio, setPdomicilio] = useState("");
  const [pcp, setPcp] = useState("");
  const [ppoblacion, setPpoblacion] = useState("");
  const [verWeb, setVerWeb] = useState(false);

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
  } = useContext(FacturappContext) as FacturappContextType;

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
  const handleSubmit = () => {
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

  // PDF GENERATOR
  const componentRef: any = useRef();

  protectRoute();

  return (
    <>
      <div>
        <div className="messages">
          {/* ERROR WINDOW */}
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
        <div className="flex justify-center">
          <h2 className="text-xl   ml-4">Fecha</h2>
          <input
            onChange={(e) => {
              setFecha(e.target.value);
            }}
            type="date"
            className="rounded-lg mb-4 ml-4 px-2 border-2 border-solid border-slate-400"
          ></input>
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
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded m-2"
            type="submit"
          >
            Guardar Factura
          </button>
        </div>
      </div>

      {/* INVOICE WEB */}
      <div ref={componentRef} className="invoiceweb">
        {verWeb ? (
          <InvoiceWeb
            base={base}
            iva={iva}
            totaliva={totaliva}
            irpf={irpf}
            totalirpf={totalirpf}
            body={body}
            fecha={fecha}
            total={total}
            // payer={payer}
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
