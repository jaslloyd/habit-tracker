import React from "react";
import Habit from "../types/habit.interface";

interface HabitSuggestion {
  habit: Habit;
  onSelect: Function;
}
const HabitSuggestion: React.SFC<HabitSuggestion> = ({
  habit: { name, description, category, target },
  onSelect
}) => (
  <div className="habit__suggestions__item">
    <button
      onClick={e => onSelect(e)}
      className="btn btn-xs btn-success"
      data-name={name}
      data-description={description}
      data-category={category}
      data-target={target}
    >
      + {name}
    </button>
  </div>
);

export default HabitSuggestion;
