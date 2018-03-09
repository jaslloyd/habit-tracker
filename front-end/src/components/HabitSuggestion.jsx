import React from 'react';
import PropTypes from 'prop-types';

const HabitSuggestion = ({
  habit: {
    name, description, category, target,
  }, onSelect,
}) => (
  <div className="row mb-2">
    <div className="col-12">
      <button onClick={e => onSelect(e)} className="btn btn-xs btn-success" data-name={name} data-description={description} data-category={category} data-target={target}>+ {name}</button>
    </div>
  </div>
);

HabitSuggestion.propTypes = {
  habit: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    target: PropTypes.number.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default HabitSuggestion;

