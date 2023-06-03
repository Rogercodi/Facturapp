import ReactToPrint from 'react-to-print';
import { Invoiceprops } from '../Types/Invoiceprops';



function InvoiceWeb({base, iva, irpf, body,fecha,payerdata,total,totalirpf,totaliva,user, papellidos, pcp, pdomicilio, pemail, pnif,pnombre,ppoblacion}: Invoiceprops) {



return (
  <div className="page">
    <div className=" toptriangle">
      <h1 className="text-4xl pt-16 pl-10">FACTURA</h1>
  {/* DATE */}
      <div className="flex justify-between">
        <div className="text-xl pl-10 pt-4">
          <h2 className="font-bold">Fecha</h2>
          <h2>{fecha || ""}</h2>
        </div>
  {/* INVOICE NUM */}
        <div className="text-xl pr-20 pt-4">
          <h2 className="font-bold">Num Factura</h2>
          <h2>{"F2023/0008"}</h2>
        </div>
      </div>
  {/* USER DATA */}
      <div className="flex justify-between">
        <div className="pl-10 pt-8">
          <p className="font-extrabold">
            {user.name + ' ' + user.surname || " "}
          </p>
          <p>{user.dni || ""}</p>
          <p>{user.address || ""}</p>
          <p>{user.cp + user.city || ""}</p>
          <p>{user.emailapp || ""}</p>
        </div>
  {/* PAYER DATA */}
        <div className="pr-20 pt-8">
          <p className="font-extrabold">
            { pnombre + ' ' + papellidos || ''}
           
          </p>
          <p>{pnif || " "}</p>
          <p>{pdomicilio || " "}</p>
          <p>{pcp + ' ' +ppoblacion || " "}</p>
          <p>{pemail || " "}</p>
        </div>
      </div>
    </div>

    {/* body */}
    <div>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-green-200 ">
          <tr className="">
            <th
              scope="col"
              className="px-2 py-3 text-xs font-medium text-gray-500 uppercase"
            >
              Cantidad
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
            >
              Descripcion
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
            >
              Importe
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr>
            <td className="text-center">1</td>
            <td className="text-center">
              {body ||
                ""}
            </td>
            <td className="text-center">{base + '€' || ""}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* IMPUESTOS */}
    <div className="flex mx-auto p-2 mt-12 border-t-solid border-t-2 border-b-2 border-gray-300 w-5/6 ">
      <div className=" text-center w-1/2 ">
        <h1 className="mb-2">IVA</h1>
        <h1 className="mb-2">TOTAL IVA</h1>
        <hr className="bg-slate-300 h-0.5 mb-2" />
        <h1 className="mb-2">IRPF</h1>
        <h1 className="">TOTAL IRPF</h1>
      </div>
      <div className=" w-1/2 text-center ">
        <h1 className="mb-2">{iva}%</h1>
        <h1 className="mb-2">{totaliva}</h1>
        <hr className="bg-slate-300 h-0.5 mb-4" />
        <h1 className="mb-2">{irpf}%</h1>
        <h1 className="mb-2">{totalirpf}</h1>
      </div>
    </div>

    {/* TOTAL */}
    <div className="flex mt-6 text-xl justify-center font-bold">
      <h1>TOTAL FACTURA</h1>
      <h1 className="ml-10 ">{total + '€' || ''}</h1>
    </div>

    {/* BANCO */}
    <div className="mt-14">
      <div className="flex mt-4 ml-10 font-bold mb-2 border-black">
        <p className="w-1/3">FORMA DE PAGO</p>
        <p className="w-1/3">BANCO</p>
        <p className="w-1/3">IBAN</p>
      </div>
      <div className="flex ml-10">
        <p className="w-1/3">Transferencia bancaria</p>
        <p className="w-1/3">Banc Sabadell</p>
        <p className="w-1/3"> ES33 1111 4444 1111 4444</p>
      </div>
    </div>
    <div className="bottomtriangle"></div>
    
  </div>
);
}

export default InvoiceWeb