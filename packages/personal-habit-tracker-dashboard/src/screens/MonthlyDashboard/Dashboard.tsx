import React from "react";
import moment from "moment";
import MonthlyDashboard from "./MonthlyDashboard";
import Loader from "../../components/Loader/Loader";
import networkHelper from "../../services/network-helper";
import Habit from "../../types/habit.interface";

interface DashboardState {
  habits: Habit[];
  loading: boolean;
  hasError: boolean;
  monthToDisplay: string;
  yearToDisplay: string;
}

interface DashboardProps {
  history: string[];
  location: {
    search: string;
  };
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      habits: [],
      loading: true,
      hasError: false,
      monthToDisplay: "",
      yearToDisplay: ""
    };
  }

  // todo: DRY up duplicated in ChallengeDashboard
  componentDidMount() {
    this.getHabits();
    const params = new URLSearchParams(this.props.location.search);
    this.setState(
      {
        monthToDisplay: params.get("month"),
        yearToDisplay: params.get("year")
      },
      () => {
        console.log(this.state.monthToDisplay);
      }
    );
  }

  componentWillUnmount() {
    networkHelper.cancelRequest();
  }

  getHabits = async () => {
    try {
      const habits = await networkHelper.fetchHelper(
        `${
          process.env.REACT_APP_API_ENDPOINT
        }/api/occurrence_habits?type=Monthly`
      );
      this.setState({ habits, loading: false });
    } catch (e) {
      this.setState({ loading: false, hasError: true });
      console.log(e);
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
    // 4. Update the state with new habit object but keeping older ones??
    this.setState({ habits: existingHabits });
    // 5. Update the habit in the backend
    this.updateHabit(existingHabits[habitIndex], id);
  };

  // todo: DRY up duplicated in ChallengeDashboard
  updateHabit = async (habitDetails: object, id: string) => {
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

  // todo: DRY up duplicated in ChallengeDashboard
  handleHabitDelete = async (id: string) => {
    await networkHelper.fetchHelper(
      `${process.env.REACT_APP_API_ENDPOINT}/api/occurrence_habits/${id}`,
      {
        method: "DELETE"
      }
    );
    this.getHabits();
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
      // } else if(this.state.hasError){
      //   return <h1>Network Request has failed please check network tab...</h1>
    } else {
      return (
        <React.Fragment>
          <MonthlyDashboard
            habits={this.state.habits}
            monthToDisplay={this.state.monthToDisplay}
            yearToDisplay={this.state.yearToDisplay}
            onHabitItemUpdate={this.handleHabitItemUpdate}
            onHabitDelete={this.handleHabitDelete}
            history={this.props.history}
          />
        </React.Fragment>
      );
    }
  }
}

export default Dashboard;
