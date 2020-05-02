import React from 'react';
import { Link } from 'react-router-dom';
import './habitActionsPanel.css';

interface ActionsProps {
  id: string;
  onDelete: Function
}

const HabitActionsPanel: React.SFC<ActionsProps> = ({
  id,
  onDelete
}) => (
  <React.Fragment>
    <Link to={`/editHabit/${id}`} type="button" className="btn edit__btn actions__btn--small text-dark">
      <i className="far fa-edit" />
    </Link>
    <button type="button" className="btn actions__btn--small delete__btn" onClick={() => onDelete(id)}>
      <i className="fas fa-trash" />
    </button>
  </React.Fragment>
)

export default HabitActionsPanel;
