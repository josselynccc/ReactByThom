import React from 'react';
import './components.css'
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement>{
  label: string;
  error?:string;
  id?:string;
}

const InputField = ({ label,error,id, ...props }:InputFieldProps) => {
  return (
        <>
        <div className='InputField'>
            <label htmlFor={id} >{label}</label>
            <input id={id} {...props}/>
            {error && <span className="error-message">{error}</span>}
        </div>
        </>
  );
};

export default InputField;