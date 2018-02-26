import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HabitItem from './HabitItem';

// This class has a lot of duplciate logic from Habit.js, I will continue to get it working then refactor/generalize as do not want to do that to early.
class ChallengeHabit extends Component {
  state = {}

  onCompleted = (index) => {
    const { id, completed } = this.props.habit;
    if (index <= completed) {
      this.props.onHabitItemUpdated(id, completed - 1);
    } else {
      this.props.onHabitItemUpdated(id, completed + 1);
    }
  }

  render() {
    const {
      id, name, target, completed, last_updated,
    } = this.props.habit;
    const habitItemElements = new Array(target).fill().map((_, i) => <HabitItem key={[name, i + 1]} index={i + 1} completed={completed} onCompleted={this.onCompleted} classSettings="big-box" />);
    return (
      <Fragment>
        <div className="row mb-3">
          <div className="col-6">
            { completed > 0 && <span className="badge badge-pill badge-default challenge-badge">{last_updated}</span> }
          </div>

          <div className="col-6 text-right">
            <Link to={`/editHabit/${id}`} type="button" className="btn btn-sm btn-light mr-2"><i className="fa fa-pencil" aria-hidden="true" /></Link>
            <button type="button" className="btn btn-sm btn-danger" onClick={() => this.props.onDelete(id)}>X</button>
          </div>
        </div>

        <div className="row mb-3" style={{ padding: '0 40px' }}>
          <div className="col-lg-3 col-md-2 col-sm-12">
            <span className="h5">
              {name}
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12" style={{ padding: '0 40px' }}>
            {habitItemElements}
          </div>
        </div>

        <div className="row">
          <div className="ml-auto col-6 text-right">
            <span className="badge badge-pill badge-default challenge-badge">{completed} / {target}</span>
          </div>
        </div>
      </Fragment>
    );
  }
}

ChallengeHabit.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    target: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
    last_updated: PropTypes.string,
  }).isRequired,
  onHabitItemUpdated: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ChallengeHabit;
