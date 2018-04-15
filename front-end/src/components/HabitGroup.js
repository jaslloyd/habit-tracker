import React from 'react';
import PropTypes from 'prop-types';
import CardBox from './CardBox';

const HabitGroup = ({ category, categoriesHabits }) => (
  <CardBox name={category}>
    <h4 className="card-header">
      {category}
    </h4>
    <div className="card-body">
      {categoriesHabits}
    </div>
  </CardBox>
);

HabitGroup.propTypes = {
  category: PropTypes.string.isRequired,
  categoriesHabits: PropTypes.node.isRequired,
};
export default HabitGroup;
