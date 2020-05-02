import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DashboardControls from "./DashboardControls";
import MonthlyHabit from "./MonthlyHabit";
import HabitGroup from "../../components/HabitGroup";
import Habit from "../../types/habit.interface";
import "./monthlyDashboard.css";

const getMonthIndex = (month: string) => {
  const monthIndex = parseInt(
    moment()
      .month(month)
      .format("M"),
    10
  );

  const currentMonthIndex = parseInt(moment().format("M"), 10);
  const newMonthIndex = currentMonthIndex - monthIndex;
  return newMonthIndex;
};

interface MonthlyState {
  currentMonth: string;
  currMonDaysLeft: number;
  displayMonthIndex: number;
  displayedYear: string;
  daysLeft: number;
}

interface MonthlyProps {
  habits: Habit[];
  monthToDisplay: string;
  yearToDisplay: string;
  onHabitItemUpdate: Function;
  onHabitDelete: Function;
  history: string[];
}

class MonthlyDashboard extends React.Component<MonthlyProps, MonthlyState> {
  constructor(props: MonthlyProps) {
    super(props);
    this.state = {
      currentMonth: moment().format("MMMM"),
      currMonDaysLeft: moment()
        .endOf("month")
        .diff(moment(), "days"),
      displayMonthIndex: 0, // This will be used to track what month is displaying compared to the current month
      displayedYear: new Date().getFullYear().toString(),
      daysLeft: moment()
        .endOf("month")
        .diff(moment(), "days")
    };
  }

  componentDidMount() {
    let newMonthIndex: number;
    let newYear: string;
    if (this.props.monthToDisplay) {
      newMonthIndex = getMonthIndex(this.props.monthToDisplay);
      newYear =
        this.props.yearToDisplay ||
        moment()
          .subtract(newMonthIndex, "month")
          .format("YYYY");
      this.switchToNewMonth(this.props.monthToDisplay, newMonthIndex, newYear);
    } else {
      this.props.history.push(
        `/?month=${this.state.currentMonth}&year=${this.state.displayedYear}`
      );
    }
  }

  switchToNewMonth = (month: string, monthIndex: number, newYear: string) => {
    this.setState({
      currentMonth: month,
      displayMonthIndex: monthIndex,
      displayedYear: newYear,
      daysLeft: moment()
        .subtract(monthIndex, "month")
        .endOf("month")
        .diff(moment(), "days")
    });
    this.props.history.push(`/?month=${month}&year=${newYear}`);
  };

  displayMonthsHabits = (e: any) => {
    e.preventDefault();
    // This is kinda confusing, when we want to go back we subtract that number from the current month, if it is minus we still subtract but we update the index -1
    const dataOperationNum = parseInt(
      e.target.getAttribute("data-operation") || "",
      10
    );
    const newIndex =
      dataOperationNum !== 0
        ? this.state.displayMonthIndex + dataOperationNum
        : 0;

    const displayedMonth = moment()
      .subtract(newIndex, "month")
      .format("MMMM");

    const displayedYear = moment()
      .subtract(newIndex, "month")
      .format("YYYY");

    this.switchToNewMonth(displayedMonth, newIndex, displayedYear);
  };

  render() {
    const filteredHabits = this.props.habits.filter(
      habit =>
        habit.year === this.state.displayedYear &&
        habit.month === this.state.currentMonth
    );

    // 1. Get all unique categories
    const categories = new Set(filteredHabits.map(habit => habit.category));
    const categoriesElements: {
      [key: string]: any;
    } = {};
    // 2. For each category, create a new category in categoriesElements which will contain a list of Habits that are of that category
    [...categories].forEach(category => {
      categoriesElements[category] = filteredHabits
        .filter(habit => habit.category === category) // Filter to only habits that match the category
        .map((habit, i) => (
          <MonthlyHabit
            key={habit._id}
            habit={habit}
            monthDaysLeft={this.state.daysLeft}
            onHabitItemUpdated={this.props.onHabitItemUpdate}
            onDelete={this.props.onHabitDelete}
            isShowing={i === 0 ? true : false}
          />
        ));
    });

    return (
      <React.Fragment>
        <DashboardControls
          onMonthChange={this.displayMonthsHabits}
          displayedMonth={this.state.currentMonth}
          displayedYear={this.state.displayedYear}
        />
        <div className="header">
          <h4 className="header__title">
            <button onClick={this.displayMonthsHabits} data-operation="0">
              {moment().format("MMMM")}
            </button>
            <span className="header__title__days">
              {this.state.currMonDaysLeft} Days Left!
            </span>
          </h4>
        </div>

        <div className="addhabit__container">
          <Link
            to={{
              pathname: "/addhabit/monthly",
              search: `month=${this.state.currentMonth}&year=${
                this.state.displayedYear
              }`
            }}
            className="btn btn-success"
          >
            Add Habit
          </Link>
        </div>

        <div className="habits__container">
          {// 3. Loop through each category and display it in a Group.
          Object.keys(categoriesElements).map(category => (
            // <HabitGroup key={category} category={category}>
            //   <h4 className="card__header">{category}</h4>
            <div className="card__body">{categoriesElements[category]}</div>
            // </HabitGroup>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default MonthlyDashboard;
