import React from 'react';
import PropTypes from 'prop-types';
import CardBox from './CardBox';

const HabitGroup = props => (
  <CardBox name={props.category}>
    <h4 className="header-title mb-4"><b>{props.category}</b></h4>
    {props.categoriesHabits}
  </CardBox>
);

HabitGroup.propTypes = {
  category: PropTypes.string.isRequired,
  categoriesHabits: PropTypes.node.isRequired,
};
export default HabitGroup;
