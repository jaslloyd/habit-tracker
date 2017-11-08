import React, { Component } from 'react';
import moment from 'moment';
import { SummaryPanel, SummaryTable } from './SummaryPanel';

class Summary extends Component {

  state = {
    habitsSummary: [],
    habitsTable: {},
    currentMonthIndex: parseInt(moment().format('M'), 10),
  }

  componentDidMount() {
    this.getHabits()
        .then((habits) => {
          this.updateUniqueHabits(habits);
          this.updateUniqueHabitsMonth(habits);
        });
  }

  getHabits() {
    return fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits`)
      .then(response => response.json())
      .catch(e => console.log(`Failed to get all habits ${e}`));
  }

  updateUniqueHabits(habits) {
    const uniqueHabits = {};
    habits.forEach(({ name, target, completed, targetMonth }) => {
      const targetMonthIndex = moment().month(targetMonth).format('M');
              // todo: don't include the current month
      if (targetMonthIndex <= this.state.currentMonthIndex) {
        if (uniqueHabits[name]) {
          uniqueHabits[name].wasTried += 1;
          uniqueHabits[name].totalCompletions += completed;
          uniqueHabits[name].totalTarget += target;
        } else {
          uniqueHabits[name] = {
            name,
            wasTried: 1,
            totalCompletions: completed,
            totalTarget: target,
          };
        }
      }
    });
    // todo: check if we need to convert it to an array, maybe we can loop through keys...
    this.setState({ habitsSummary: Object.values(uniqueHabits) });
  }

  updateUniqueHabitsMonth(p_habits) {
    const habits = {};
    p_habits.forEach(({ name, target, completed, targetMonth }) => {
      if (!habits[name]) {
        habits[name] = new Array(12).fill('NA');
      }
      const monthIndex = moment().month(targetMonth).format('M') - 1;
      habits[name][monthIndex] = (target - completed) !== 0 ? 'fail' : 'success';
    });
    console.log('Completed matrix', habits);
    this.setState({ habitsTable: habits });
  }

  render() {
    const habitElements = this.state.habitsSummary.map(habit => <SummaryPanel key={habit.name} habit={habit} />);
    const tableElements = [];
    for (const key in this.state.habitsTable) {
      tableElements.push(<SummaryTable key={key} name={key} values={this.state.habitsTable[key]} />);
    }
    return (
      <div>
        <h1 className="m-3 text-center">Yearly Summary</h1>
        <div className="row">
          {habitElements}
          <table className="table">
            <thead />
            <tbody>
              {tableElements}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}

export default Summary;
