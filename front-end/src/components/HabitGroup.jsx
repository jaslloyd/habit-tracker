import React from 'react';
import PropTypes from 'prop-types';

const HabitGroup = props => (
  <div id={props.category} className="card-box col-10 mx-auto">
    <h4 className="header-title mb-4"><b>{props.category}</b></h4>
    {props.categoriesHabits}
  </div>
);

HabitGroup.propTypes = {
  category: PropTypes.string.isRequired,
  categoriesHabits: PropTypes.array.isRequired,
};
export default HabitGroup;
