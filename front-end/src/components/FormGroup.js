import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = props => (
  <div className="form-group">
    {props.children}
    {/* <label htmlFor="name">{props.label}</label>
    <input type="text" className="form-control" name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.onInputChange} required /> */}
  </div>
);

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default FormGroup;
