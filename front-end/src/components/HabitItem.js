import React from 'react';

const HabitItem = (props) => (
    <input type="checkbox" className="" 
        checked={props.index <= props.completed ? 'checked' : ''}
        disabled={props.index > props.completed + 1}
        onChange={() => props.onCompleted(props.index)}
    />
);

export default HabitItem;