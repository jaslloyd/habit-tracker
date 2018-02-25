import React from 'react';
import PropTypes from 'prop-types';

const HabitItem = ({
  classSettings, index, completed, onCompleted,
}) => (
  <input
    type="checkbox"
    className={classSettings}
    checked={index <= completed ? 'checked' : ''}
    disabled={index > completed + 1}
    onChange={() => onCompleted(index)}
    value={index}
  />
);

HabitItem.propTypes = {
  completed: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onCompleted: PropTypes.func.isRequired,
  classSettings: PropTypes.string,
};

HabitItem.defaultProps = {
  classSettings: '',
};

export default HabitItem;
