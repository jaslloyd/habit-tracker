import React from 'react';
import PropTypes from 'prop-types';

const HabitItem = props => (
  <input
    type="checkbox"
    className={props.classSettings || ''}
    checked={props.index <= props.completed ? 'checked' : ''}
    disabled={props.index > props.completed + 1}
    onChange={() => props.onCompleted(props.index)}
  />
);

HabitItem.propTypes = {
  completed: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onCompleted: PropTypes.func.isRequired,
};
export default HabitItem;
