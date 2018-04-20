import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { object } from 'prop-types';
import moment from 'moment';
import MonthlyHabit from './MonthlyHabit';
import HabitGroup from './HabitGroup';
import DashboardControls from './DashboardControls';

class MonthlyDashboard extends Component {
  state = {
    currentMonth: moment().format('MMMM'),
    currMonDaysLeft: moment().endOf('month').diff(moment().today, 'days'),
    displayMonthIndex: 0, // This will be used to track what month is displaying compared to the current month
    displayedYear: moment().format('YYYY'),
    daysLeft: moment().endOf('month').diff(moment().today, 'days'),
  }

  displayMonthsHabits = (e) => {
    // This is kinda confusing, when we want to go back we subtract that number from the current month, if it is minus we still subtract but we update the index -1
    const dataOperationNum = parseInt(e.target.getAttribute('data-operation'), 10);
    const newIndex = dataOperationNum !== 0 ? this.state.displayMonthIndex + dataOperationNum : 0;
    const displayedMonth = moment().subtract(newIndex, 'month').format('MMMM');
    const newDisplayedYear = moment().subtract(newIndex, 'month').format('YYYY');

    this.setState({
      currentMonth: displayedMonth,
      displayMonthIndex: newIndex,
      displayedYear: newDisplayedYear,
      daysLeft: moment().subtract(newIndex, 'month').endOf('month').diff(moment().today, 'days'),
    });
    e.preventDefault();
  }

  render() {
    const filteredHabits = this.props.habits
      .filter(habit => habit.year === this.state.displayedYear)
      .filter(habit => habit.target_month === this.state.currentMonth);

    console.log(filteredHabits);
    // 1. Get all unique categories
    const categories = new Set(filteredHabits.map(habit => habit.category));
    const categoriesElements = {};
    // 2. For each category, create a new category in categoriesElements which will contain a list of Habits that are of that category
    [...categories].forEach((category) => {
      categoriesElements[category] =
            filteredHabits.filter(habit => habit.category === category) // Filter to only habits that match the category
              .map(habit => <MonthlyHabit key={habit.id} habit={habit} monthDaysLeft={this.state.daysLeft} onHabitItemUpdated={this.props.onHabitItemUpdate} onDelete={this.props.onHabitDelete} />); // For each habit in that category create a habit element
    });

    // 3. Loop through each category and add some extra html, this will be its own component later (HabitGroup)
    const finalElements = Object.keys(categoriesElements).map(category =>
      <HabitGroup key={category} category={category} categoriesHabits={categoriesElements[category]} />);

    return (
      <Fragment>
        <div className="row mt-3">
          <div className="mx-auto col-md-10 text-center">
            <DashboardControls onMonthChange={this.displayMonthsHabits} displayedMonth={this.state.currentMonth} displayedYear={this.state.displayedYear} />
          </div>
        </div>
        <div className="row">
          <div className="mx-auto col-lg-2 col-md-4 col-sm-12 text-center">
            <h4 className="header-title">
              <a href="" onClick={this.displayMonthsHabits} data-operation="0"> {moment().format('MMMM')}</a>
              <span className="ml-2">{this.state.currMonDaysLeft} Days Left!</span>
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="mx-auto col-10 p-0 text-right">
            <Link to={{ pathname: '/addhabit/monthly', search: `month=${this.state.currentMonth}` }} className="btn btn-success pull-right">Add Habit</Link>
          </div>
        </div>

        <div id="habit-list" className="mt-3 row">
          {finalElements}
        </div>
      </Fragment>
    );
  }
}

MonthlyDashboard.propTypes = {
  habits: PropTypes.arrayOf(object).isRequired,
  onHabitItemUpdate: PropTypes.func.isRequired,
  onHabitDelete: PropTypes.func.isRequired,
};


export default MonthlyDashboard;
