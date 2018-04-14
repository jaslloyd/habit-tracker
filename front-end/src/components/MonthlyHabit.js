import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HabitItem from './HabitItem';

class Habit extends Component {
  /**
   * When a habit mounts for each entry in a habit display habit item
  */
  state = {
    color: 'black',
    displayClass: ''
  }

  componentDidMount() {
    this.updateHabitColor();
  }

  onCompleted = (index) => {
    const { id, completed } = this.props.habit;
    if (index <= completed) {
      this.props.onHabitItemUpdated(id, completed - 1);
    } else {
      this.props.onHabitItemUpdated(id, completed + 1);
    }
    this.updateHabitColor();
  }

  updateHabitColor = () => {
    const { target, completed } = this.props.habit;
    const canComplete = this.props.monthDaysLeft - (target - completed);

    if (canComplete < 0) {
      this.setState({ color: 'red' });
      this.setState({ displayClass: 'disabledControls' })
    } else if (canComplete === 0 || canComplete <= 5) {
      this.setState({ color: 'orange' });
    } else {
      this.setState({ color: '#98a6ad' });
    }
  }

  render() {
    const {
      id, name, target, completed, lastUpdated,
    } = this.props.habit;
    const habitItemElements = new Array(target).fill().map((_, i) => <HabitItem key={[name, i + 1]} index={i + 1} completed={completed} onCompleted={this.onCompleted} />);

    const lastUpdatedFormatted = lastUpdated.length > 0 && `${lastUpdated[lastUpdated.length - 1].date}@${lastUpdated[lastUpdated.length - 1].time}`;

    return (
      <div className="row mt-2 mb-2 align-items-center">
        <div className="col-lg-2 col-md-2 col-sm-8 monthly-habit-title-sm">
          <span className="h5">{name} </span>
          { completed > 0 && <span className="h5 badge badge-pill badge-default">{lastUpdatedFormatted}</span> }
        </div>
        <div className={'col-lg-7 col-md-7 col-sm-12 habit-padding ' + this.state.displayClass}>
          {habitItemElements}
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12">
          <span style={{ color: this.state.color }}>{completed}/{target} Completed</span>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-4 monthly-habit-controls-sm mb-2">
          <Link to={`/editHabit/${id}`} type="button" className="btn btn-sm btn-secondary mr-2 text-dark"><i className="far fa-edit"></i></Link>
          <button type="button" className="btn btn-sm btn-danger" onClick={() => this.props.onDelete(id)}>X</button>
        </div>
      </div>
    );
  }
}

Habit.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    target: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
    lastUpdated: PropTypes.array.isRequired,
  }).isRequired,
  onHabitItemUpdated: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  monthDaysLeft: PropTypes.number.isRequired,
};

export default Habit;
