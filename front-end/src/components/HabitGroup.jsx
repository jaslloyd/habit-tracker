import React from 'react';
import PropTypes from 'prop-types';
import CardBox from './CardBox';

const HabitGroup = ({ category, categoriesHabits }) => (
  <CardBox name={category}>
    <h4 className="header-title mb-4"><b>{category}</b></h4>
    {categoriesHabits}
  </CardBox>
);

HabitGroup.propTypes = {
  category: PropTypes.string.isRequired,
  categoriesHabits: PropTypes.node.isRequired,
};
export default HabitGroup;
