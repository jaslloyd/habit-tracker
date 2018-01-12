import React from 'react';
import PropTypes from 'prop-types';

const HabitSuggestion = ({ habit, onSelect }) => (
  <div className="col-sm-3 mb-2">
    <button onClick={e => onSelect(e)} className="btn btn-xs btn-success" data-name={habit.name} data-description={habit.description} data-category={habit.category} data-target={habit.target}>+ {habit.name}</button>
  </div>
);

HabitSuggestion.propTypes = {
  habit: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default HabitSuggestion;

