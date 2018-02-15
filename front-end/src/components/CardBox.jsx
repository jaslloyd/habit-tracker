import React from 'react';
import PropTypes from 'prop-types';

const CardBox = ({ name, children }) => (
  <div id={name} className="card-box col-10 mx-auto">
    {children}
  </div>
);

CardBox.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CardBox;
