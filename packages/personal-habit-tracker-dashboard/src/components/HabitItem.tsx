import React from 'react';

interface ItemProps {
  classSettings?: string;
  index: number;
  completed: number;
  onCompleted: Function;
}

const HabitItem: React.SFC<ItemProps> = ({ 
  classSettings,
  index,
  completed,
  onCompleted
}) => (
  <input
    type="checkbox"
    className={classSettings}
    checked={index <= completed ? true : false}
    disabled={index > completed + 1}
    onChange={() => onCompleted(index)}
    value={index}
    data-value={index}
  />
);

export default HabitItem;
