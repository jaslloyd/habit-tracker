import React from 'react';

const HabitSuggestion = (props) => (
    <div className="col-sm-3 mb-2">
            <button onClick={(e) => props.onSelect(e)} className="btn btn-xs btn-success">+ {props.habit.name}</button>
            {/* <span>{props.habit.name}</span> */}
    </div>
);

export default HabitSuggestion;