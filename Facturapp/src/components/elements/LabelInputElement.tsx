

type ILabelElement = {
    htmlFor: string,
    children: string
}

function LabelInputElement({htmlFor, children}: ILabelElement) {
  return (
    <div>
         <label
                htmlFor={htmlFor}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {children}
              </label>
    </div>
  )
}

export default LabelInputElement