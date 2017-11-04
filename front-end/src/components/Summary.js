import React, { Component } from 'react';
import SummaryPanel from './SummaryPanel';
import moment from 'moment';

class Summary extends Component {

    state = {
        habitsSummary: [],
        current_mon_index: parseInt(moment().format('M'), 10)
    }
    
    componentDidMount(){
        this.getHabits()
            .then(habits => this.updateUniqueHabits(habits))
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
        return fetch(`http://localhost:3001/api/occurrence_habits`)
          .then(response => response.json())
          .catch(e => console.log(`Failed to get all habits ${e}`));
    }

    render() {
        const habit_elements = this.state.habitsSummary.map(habit => <SummaryPanel key={habit.name} habit={habit} />)
        return (
            <div>
                <h1 className="m-3 text-center">Yearly Summary</h1>
                <div className="row">
                    {habit_elements}
                </div>
            </div>
        )
    }

}

export default Summary;