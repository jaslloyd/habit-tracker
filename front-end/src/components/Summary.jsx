import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { SummaryPanel, SummaryTable } from './SummaryPanel';

class Summary extends Component {

  state = {
    habitsSummary: [],
    habitsTable: [],
    currentMonthIndex: parseInt(moment().format('M'), 10),
  }

  async componentDidMount() {
    const habits = await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits`)).json();
    this.updateUniqueHabits(habits);
    // this.updateUniqueHabitsMonth(habits);
  }

  updateUniqueHabits(habits) {
    const uniqueHabits = {};
    habits.forEach(({ name, target, completed, target_month }) => {
      const targetMonthIndex = moment().month(target_month).format('M');
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

  updateUniqueHabitsMonth(allHabits) {
    const habits = {};
    allHabits.forEach(({ name, target, completed, target_month }) => {
      if (!habits[name]) {
        habits[name] = new Array(12).fill('NA');
      }
      const monthIndex = moment().month(target_month).format('M') - 1;
      habits[name][monthIndex] = (target - completed) !== 0 ? 'fail' : 'success';
    });
    console.log('Completed matrix', habits);
    this.setState({ habitsTable: habits });
  }

  render() {
    const habitElements = this.state.habitsSummary.map(habit => <SummaryPanel key={habit.name} habit={habit} />);
    const tableElements = this.state.habitsTable.map(key => <SummaryTable key={key} name={key} values={this.state.habitsTable[key]} />);

    return (
      <Fragment>
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
      </Fragment>
    );
  }

}

export default Summary;
