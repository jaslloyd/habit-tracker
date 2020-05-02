import React from "react";
import PropTypes from "prop-types";

interface FormGroup {
  children: React.ReactNode;
}
const FormGroup: React.SFC<FormGroup> = ({ children }) => (
  <div className="form__group">{children}</div>
);

export default FormGroup;
