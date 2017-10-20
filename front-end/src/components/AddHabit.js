import React, { Component } from 'react';
import moment from 'moment';
import HabitSuggestion from './HabitSuggestion';

class AddHabit extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            category: '',
            target: 0,
            existing_habits: [],
            filter_obj: `{"where": {"target_month": "${moment().format('MMMM')}"}}`,
        }
    }
    
    componentDidMount(){
        this.getHabits();
    }

    getHabits(){
        // This will get habits from this month so you can add it to next month, improvement would be get habits from last X months
        fetch(`http://localhost:3001/api/occurrence_habits?filter=${this.state.filter_obj}`)
          .then(response => response.json())
          .then(results => this.setState({existing_habits: results}))
          .catch(e => console.log(`Failed to get all habits ${e}`));
    }

    handleSelectedHabit(e){
        // todo: fill fields so user can edit the detials and add it
        this.setState({
            name:  e.target.getAttribute('data-name'),
            description: e.target.getAttribute('data-description'),
            category: e.target.getAttribute('data-category'),
            target: e.target.getAttribute('data-target')
        })
        e.preventDefault()
    }

    onSubmit(e){
        // Add habit to db..then redirect
        const new_habit = {
            'name': this.refs.habit_name.value,
            'description': this.refs.habit_desc.value,
            'category': this.refs.habit_cat.value,
            'target': parseInt(this.refs.habit_target.value, 10),
            'completed': 0,
            'target_month': this.refs.habit_mon.value
        }
        /**
         * todo: only add habit if it doesn't exist, 
         * GET /occurrence_habits/count
         * e.g. {"name": "Eat no Cakes", "target_month": "November"}
         * returns count 
         */ 
        this.addHabit(new_habit)
        e.preventDefault()
    }
    
    addHabit(habit){
        fetch('http://localhost:3001/api/occurrence_habits', {
            method: 'POST',
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(habit)
          })
          .then(response => response.json())
          .then(result => this.props.history.push('/'))
          .catch(e => console.log(`Failed to add new habit ${e}`));
    }

    render() {
        const monthElements = []
        const current_mon_index = parseInt(moment().format('M'), 10) - 1
        for(let i = current_mon_index;i < current_mon_index + 4; i++){
            monthElements.push(<option key={i}>{moment.months(i)}</option>)
        }

        const habitsElements = this.state.existing_habits.map(habit => <HabitSuggestion key={habit.id} habit={habit} onSelect={this.handleSelectedHabit.bind(this)} />)
        return (
            <div>
                <h1 className="m-3">Add Habit</h1>
                <div className="row">
                    {habitsElements}
                </div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="habit_name">Habit Name:</label>
                        <input type="text" className="form-control" ref="habit_name" id="habitName" placeholder="Habit Name e.g. Wake up before 8am each day" value={this.state.name} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="habit_desc">Description:</label>
                        <input type="text" className="form-control" ref="habit_desc" id="habit_desc" placeholder="Why do you want to complete it?"  value={this.state.description} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="habit_cat">Category:</label>
                        <input type="text" className="form-control" ref="habit_cat" id="habit_cat" placeholder="Health / Finance / Career" value={this.state.category} required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="habit_mon">Month of Habit:</label>
                    <select className="form-control" id="habit_mon" ref="habit_mon">
                        <option defaultValue>Choose Month</option>
                        {monthElements}
                    </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="habit_target">How many days do you want to do this habit?</label>
                        <input type="number" className="form-control" ref="habit_target" name="days" step="1" min="1" max="30" placeholder="1"  value={this.state.target} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }

}

export default AddHabit;