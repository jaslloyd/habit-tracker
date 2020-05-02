import React from "react";
import HabitItem from "../../components/HabitItem";
import HabitActionsPanel from "../../components/HabitActionsPanel";
import Habit from "../../types/habit.interface";
import "./monthlyHabit.css";

interface MonthlyState {
  color: string;
  displayClass: string;
  showLastUpdated: boolean;
}

interface MonthlyProps {
  habit: Habit;
  onHabitItemUpdated: Function;
  monthDaysLeft: number;
  onDelete: Function;
  isShowing: boolean;
}

class MonthlyHabit extends React.Component<MonthlyProps, MonthlyState> {
  constructor(props: MonthlyProps) {
    super(props);
    this.state = {
      color: "black",
      displayClass: "",
      showLastUpdated: false
    };
  }

  componentDidMount() {
    this.updateHabitColor();
  }

  onCompleted = (index: number) => {
    const { _id: id, completed } = this.props.habit;
    if (index <= completed) {
      this.props.onHabitItemUpdated(id, completed - 1);
    } else {
      this.props.onHabitItemUpdated(id, completed + 1);
    }
    this.updateHabitColor();
  };

  updateHabitColor = () => {
    const { target, completed } = this.props.habit;
    let canComplete = this.props.monthDaysLeft - (target - completed);
    if (this.props.monthDaysLeft === 0) {
      canComplete = target - completed;
    }

    console.log(`${this.props.habit.name} canComplete ${canComplete}`);
    if (canComplete < 0) {
      this.setState({
        color: "red",
        displayClass: "disabledControls"
      });
    } else if (canComplete === 0 || canComplete <= 5) {
      this.setState({ color: "orange" });
    } else {
      this.setState({ color: "#98a6ad" });
    }
  };

  toggleLastUpdated = () => {
    this.setState(prevState => ({
      showLastUpdated: !prevState.showLastUpdated
    }));
  };

  render() {
    const { _id: id, name, target, completed, lastUpdated } = this.props.habit;
    const habitItemElements = new Array(target)
      .fill(null)
      .map((_, i) => (
        <HabitItem
          key={`${name}_${i}`}
          index={i + 1}
          completed={completed}
          onCompleted={this.onCompleted}
        />
      ));

    const lastUpdatedFormatted =
      lastUpdated.length > 0 &&
      `${lastUpdated[lastUpdated.length - 1].date}@${
        lastUpdated[lastUpdated.length - 1].time
      }`;

    return (
      this.props.isShowing && (
        <div className="container">
          <div className="habit__actionbtns">
            <HabitActionsPanel id={id} onDelete={this.props.onDelete} />
          </div>
          <h1>{name}</h1>
          <div
            className="habit__information btn--link"
            onClick={this.toggleLastUpdated}
          >
            {this.state.showLastUpdated ? (
              <span>
                <span className="badge badge-pill badge-default">
                  {lastUpdatedFormatted}
                </span>
              </span>
            ) : (
              <span style={{ color: this.state.color }}>
                {completed} / {target} Completed
              </span>
            )}
          </div>
          <div className={`habit__elements ${this.state.displayClass}`}>
            {habitItemElements}
          </div>
        </div>
      )
    );
  }
}

const MonthlyHabit2: React.FC<MonthlyProps> = props => {
  return (
    props.isShowing && (
      <div className="container">
        <h1>Habit New</h1>
      </div>
    )
  );
};

export default MonthlyHabit;
