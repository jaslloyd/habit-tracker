import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = props => (
  <div className="form-group">
    {props.children}
  </div>
);

FormGroup.propTypes = {
  children: PropTypes.element.isRequired,
};
export default FormGroup;
