import React, { Component } from 'react';
// import moment from 'moment';

class Summary extends Component {

    constructor(props){
        super(props);
        this.state = {
            habitsSummary: []
        }
    }
    
    componentDidMount(){
        this.getHabits()
            .then(habits => {
                let unique_habits = {}
                habits.forEach(({name, target, completed}) => {
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
                });

                console.log(Object.values(unique_habits))
                // todo: check if we need to convert it to an array, maybe we can loop through keys...
                this.setState({habitsSummary: Object.values(unique_habits)})
            })
    }

    getHabits(){
        return fetch(`http://localhost:3001/api/occurrence_habits`)
          .then(response => response.json())
          .catch(e => console.log(`Failed to get all habits ${e}`));
    }

    render() {
        console.log(this.state.habitsSummary)
        // todo: Create a SummaryPanel class
        const habit_elements = this.state.habitsSummary.map(habit => habit.name)
        console.log(habit_elements)
        return (
            <div>
                <h1 className="m-3 text-center">Summary</h1>
                <div className="row">
                    {habit_elements}
                </div>
            </div>
        )
    }

}

export default Summary;