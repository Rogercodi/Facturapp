import { ReactNode } from "react"

interface props {
  nombre: string,
  age: number,
  address: string
  otherProp?: any
}

function MyInvoices() {

 let test: props[] = [{
  nombre: 'roger',
  age: 30,
  address: '/hola',
    
},{
  nombre: 'roger',
  age: 30,
  address: '/hola',
    
}]
    return (
        <div className="flex flex-col mt-10">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="border overflow-hidden dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
         {
          test.map((item)  => {
            return (
              <tr >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{item.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"></td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a className="text-blue-500 hover:text-blue-700" href="#"></a>
                </td>
              </tr>
            )
          })

         }
         
         
         
         
         
         
          {/* <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{test[0].nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"></td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a className="text-blue-500 hover:text-blue-700" href="#"></a>
                </td>
              </tr> */}
          
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
      )
}

export default MyInvoices