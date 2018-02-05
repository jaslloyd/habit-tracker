import React from 'react';
import PropTypes from 'prop-types';

const CardBox = props => (
  // pl-0 pr-0 pt-0 lh-0 for no padding in corners
  <div id={props.name} className="card-box col-10 mx-auto">
    {props.children}
  </div>
);

CardBox.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CardBox;
