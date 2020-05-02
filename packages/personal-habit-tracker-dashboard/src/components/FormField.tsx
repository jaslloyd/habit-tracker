import React from "react";

interface FormFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: any;
  required: boolean;
  step?: string;
  min?: string;
  max?: string;
}
const FormField: React.SFC<FormFieldProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = true,
  step,
  min,
  max
}) => (
  <React.Fragment>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      className="form__control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      step={step}
      min={min}
      max={max}
    />
  </React.Fragment>
);

export default FormField;
