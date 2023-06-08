import React from "react";
import LabelInputElement from "./LabelInputElement";

type IFormInputElementProps = {
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  htmlFor: string;
  children: string;
};

function FormInputElement({
  id,
  name,
  type,
  autoComplete,
  onChange,
  htmlFor,
  children,
}: IFormInputElementProps) {
  return (
    <>
      <LabelInputElement htmlFor={htmlFor} children={children} />
      <div className="mt-2">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            onChange(e.target.value);
          }}
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </>
  );
}

export default FormInputElement;
