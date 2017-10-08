import React from 'react';

const HabitItem = (props) => (
    // Checkbox should be disabled if the last one has not been checked
    <label className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" 
            checked={props.index <= props.completed ? 'checked' : ''}
            disabled={props.index > props.completed + 1}
            onChange={() => props.onCompleted(props.index)}
        />
        <span className="custom-control-indicator"></span>
    </label>
);

export default HabitItem;