import React, { Component } from 'react';
import {SummaryPanel, SummaryTable} from './SummaryPanel';
import moment from 'moment';

class Summary extends Component {

    state = {
        habitsSummary: [],
        habits_table: {},
        current_mon_index: parseInt(moment().format('M'), 10)
    }
    
    componentDidMount(){
        this.getHabits()
            .then(habits => this.updateUniqueHabits(habits))

        this.getHabits()
            .then(habits => this.updateUniqueHabitsMonth(habits))
    }

    updateUniqueHabitsMonth(p_habits){
        let habits = {}
        p_habits.forEach(({name, target, completed, target_month}) => {
            if(!habits.hasOwnProperty(name))
                habits[name] = new Array(12).fill("NA");
            const month_index = moment().month(target_month).format("M") - 1 
            habits[name][month_index] = (target - completed) !== 0 ? 'fail' : 'success'
        })

        console.log('Completed matrix', habits)
        this.setState({habits_table: habits})
    }
    updateUniqueHabits(habits){
        let unique_habits = {}
        habits.forEach(({name, target, completed, target_month}) => {
            const target_month_index = moment().month(target_month).format("M");
            // todo: don't include the current month
            if (target_month_index <= this.state.current_mon_index){
                if(unique_habits.hasOwnProperty(name)){
                    unique_habits[name]['was_tried'] += 1
                    unique_habits[name]['total_completions'] += completed
                    unique_habits[name]['total_target'] += target
                }else{
                    unique_habits[name] = {
                        'name': name,
                        'was_tried': 1,
                        'total_completions': completed,
                        'total_target': target
                    }
                }
            }
        });
        // todo: check if we need to convert it to an array, maybe we can loop through keys...
        this.setState({habitsSummary: Object.values(unique_habits)})
    }
    getHabits(){
        return fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits`)
          .then(response => response.json())
          .catch(e => console.log(`Failed to get all habits ${e}`));
    }

    render() {
        const habit_elements = this.state.habitsSummary.map(habit => <SummaryPanel key={habit.name} habit={habit} />)
        let table_elements = []
        for(let key in this.state.habits_table){
            table_elements.push(<SummaryTable key={key} name={key} values={this.state.habits_table[key]} />)
        }
        return (
            <div>
                <h1 className="m-3 text-center">Yearly Summary</h1>
                <div className="row">
                    {habit_elements}
                    <table className="table">
                        <thead>
                        </thead>
                        <tbody>
                            {table_elements}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default Summary;