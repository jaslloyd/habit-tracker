import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ChallengeHabit from "./ChallengeHabit";
import Loader from "../../components/Loader/Loader";
import Habit from "../../types/habit.interface";
import networkHelper from "../../services/network-helper";
import "./challengeDashboard.css";

interface ChallengeState {
  habits: Habit[];
  completedAndFailedHabits: Habit[];
  incompleteHabits: Habit[];
  showCompletedHabits: boolean;
  loading: boolean;
}

// This class has a lot of duplicate logic from Dashboard.js, I will continue to get it working then refactor/generalize as do not want to do that to early.
class ChallengeDashboard extends React.Component<{}, ChallengeState> {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
      completedAndFailedHabits: [],
      incompleteHabits: [],
      showCompletedHabits: false,
      loading: true
    };
  }

  // todo: Dry up duplicated in Dashboard
  componentDidMount() {
    this.getHabits();
  }

  componentWillUnmount() {
    networkHelper.cancelRequest();
  }

  getHabits = async () => {
    try {
      const results: Habit[] = await networkHelper.fetchHelper(
        `${
          process.env.REACT_APP_API_ENDPOINT
        }/api/occurrence_habits?type=Challenge`
      );
      this.setState(
        {
          habits: results,
          completedAndFailedHabits: results.filter(
            habit =>
              habit.completed >= habit.target ||
              moment().diff(moment.unix(habit.endDate)) > 0
          ),
          incompleteHabits: results.filter(
            habit =>
              habit.completed < habit.target &&
              moment().diff(moment.unix(habit.endDate)) < 0
          ),
          loading: false
        },
        () => console.log(this.state.habits)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // todo: Dry up duplicated in Dashboard
  handleHabitItemUpdate = (id: string, numCompleted: number) => {
    const existingHabits = this.state.habits;
    // 1. Find the habit we are updating
    const habitIndex = this.state.habits.findIndex(habit => habit._id === id);
    const habit = existingHabits[habitIndex];
    // 2. Check if your adding a completion or removing a completion
    const isNewEntry = numCompleted > habit.completed;
    // 2. change the value of num of completed
    habit.completed = numCompleted;
    // Only update the last_updated when a new entry is added.
    if (isNewEntry) {
      // 3. Set the last_updated date to today.
      habit.last_updated = moment().format("Do@HH:mm");
      // 3.5 Update the lastUpdated list so we can keep track of all the dates...
      if (habit.lastUpdated) {
        habit.lastUpdated.push({
          date: moment().format("Do"),
          time: moment().format("HH:mm")
        });
      }
    }

    // 4. Update the state with new habit object
    // this.setState({ habits: existingHabits });
    this.setState({
      habits: existingHabits,
      completedAndFailedHabits: existingHabits.filter(
        habit =>
          habit.completed >= habit.target ||
          moment().diff(moment.unix(habit.endDate)) > 0
      ),
      incompleteHabits: existingHabits.filter(
        habit =>
          habit.completed < habit.target &&
          moment().diff(moment.unix(habit.endDate)) < 0
      )
    });
    // 5. Update the habit in the backend
    this.updateHabit(existingHabits[habitIndex], id);
  };

  // todo: DRY up duplicated in Dashboard
  updateHabit = async (habitDetails: Habit, id: string) => {
    const requestDetails = {
      method: "PUT",
      body: JSON.stringify(habitDetails)
    };
    await networkHelper.fetchHelper(
      `${process.env.REACT_APP_API_ENDPOINT}/api/occurrence_habits/${id}`,
      requestDetails
    );
    console.log(`Habit: ${id} updated...`);
  };

  // todo: DRY up duplicated in Dashboard
  handleHabitDelete = async (id: string) => {
    await networkHelper.fetchHelper(
      `${process.env.REACT_APP_API_ENDPOINT}/api/occurrence_habits/${id}`,
      {
        method: "DELETE"
      }
    );
    this.getHabits();
  };

  handleShowCompletedHabits = () => {
    this.setState(prevState => ({
      showCompletedHabits: !prevState.showCompletedHabits
    }));
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <div className="challenge__header">
          <div className="header__title--big">
            <h3>Challenges</h3>
          </div>
          <div className="challenge__header__btns">
            <Link
              to="/addhabit/challenge"
              className="btn btn-success text-right"
            >
              Add Habit
            </Link>
          </div>
        </div>
        {this.state.incompleteHabits.map(habit => (
          <ChallengeHabit
            key={habit.name}
            habit={habit}
            onHabitItemUpdated={this.handleHabitItemUpdate}
            onDelete={this.handleHabitDelete}
          />
        ))}
        {this.state.showCompletedHabits &&
          this.state.completedAndFailedHabits.map(habit => (
            <ChallengeHabit
              key={habit.name}
              habit={habit}
              onHabitItemUpdated={this.handleHabitItemUpdate}
              onDelete={this.handleHabitDelete}
            />
          ))}
        <button
          onClick={this.handleShowCompletedHabits}
          className="btn habits__toggle__btn"
        >
          {this.state.showCompletedHabits
            ? "Hide Completed/Failed"
            : "Show Completed/Failed"}
        </button>
      </React.Fragment>
    );
  }
}

export default ChallengeDashboard;
