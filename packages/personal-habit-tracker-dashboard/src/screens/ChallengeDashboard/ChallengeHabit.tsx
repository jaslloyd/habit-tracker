import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import HabitItem from "../../components/HabitItem";
import HabitActionsPanel from "../../components/HabitActionsPanel";
import Habit from "../../types/habit.interface";
import "./challengeHabit.css";

interface ChallengeProps {
  habit: Habit;
  onHabitItemUpdated: Function;
  onDelete: Function;
}

// This class has a lot of duplciate logic from Habit.js, I will continue to get it working then refactor/generalize as do not want to do that to early.
class ChallengeHabit extends React.Component<ChallengeProps, {}> {
  onCompleted = (index: number) => {
    const { _id: id, completed } = this.props.habit;
    if (index <= completed) {
      this.props.onHabitItemUpdated(id, completed - 1);
    } else {
      this.props.onHabitItemUpdated(id, completed + 1);
    }
  };

  render() {
    const {
      _id: id,
      name,
      target,
      completed,
      lastUpdated,
      endDate
    } = this.props.habit;
    let endDateFormatted;
    let daysLeft;
    let displayClass = "";

    if (endDate) {
      endDateFormatted = moment.unix(endDate).format("DD-MM-YYYY");
      daysLeft = moment().diff(moment.unix(endDate), "days");
      if (daysLeft > 0) {
        displayClass = "disabledControls";
      }
    }

    const habitItemElements = new Array(target)
      .fill(null)
      .map((_, i) => (
        <HabitItem
          key={`name+${i + 1}`}
          index={i + 1}
          completed={completed}
          onCompleted={this.onCompleted}
          classSettings="big__box"
        />
      ));

    const lastUpdatedFormatted =
      lastUpdated.length > 0 &&
      `${lastUpdated[lastUpdated.length - 1].date}@${
        lastUpdated[lastUpdated.length - 1].time
      }`;

    return (
      <div id={name} key={name} className="card__box challenge__habit">
        <div className="challenge__habit__header">
          <div className="badge badge-pill badge-default challenge__badge challenge__badge--topleft">
            {completed > 0 ? lastUpdatedFormatted : "Never"}
          </div>

          <div style={{ textAlign: "right" }}>
            <HabitActionsPanel id={id} onDelete={this.props.onDelete} />
          </div>
        </div>

        <div className="challenge__habit__name">
          <div className="habit__name card__header">
            <h5>{name}</h5>
          </div>
        </div>

        <div className={`habit__item__container ${displayClass}`}>
          {habitItemElements}
        </div>

        <div className="challenge__habit__footer">
          {completed === target ? (
            <div className="badge badge-pill badge-success challenge__badge challenge__badge--bottomleft">
              Completed Sucessfully
            </div>
          ) : (
            <div className="badge badge-pill badge-default challenge__badge challenge__badge--bottomleft">
              Complete By: {endDateFormatted}
            </div>
          )}
          <div style={{ textAlign: "right" }}>
            <div className="badge badge-pill badge-default challenge__badge challenge__badge--bottomright">
              {completed} / {target}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChallengeHabit;
