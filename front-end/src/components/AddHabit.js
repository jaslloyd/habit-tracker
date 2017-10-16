import React, { Component } from 'react';
import moment from 'moment';

class AddHabit extends Component {
    
    addHabit(e){
        // Add habit to db..then redirect
        const new_habit = {
            'name': this.refs.habit_name.value,
            'description': this.refs.habit_desc.value,
            'category': this.refs.habit_cat.value,
            'target': parseInt(this.refs.habit_target.value, 10),
            'completed': 0,
            'target_month': this.refs.habit_mon.value
        }

        fetch('http://localhost:3001/api/occurrence_habits', {
            method: 'POST',
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_habit)
          })
          .then(response => response.json())
          .then(result => this.props.history.push('/'))
          .catch(e => console.log(`Failed to add new habit ${e}`));
        
        e.preventDefault()
    }
    
    render() {
        const monthElements = []
        const current_mon_index = parseInt(moment().format('M')) // 2
        for(let i=current_mon_index;i<13;i++){
            monthElements.push(<option key={i}>{moment.months(i)}</option>)
        }
        
        return (
            <div>
                <h1 className="m-3">Add Habit</h1>
                <form onSubmit={this.addHabit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="habit_name">Habit Name:</label>
                        <input type="text" className="form-control" ref="habit_name" id="habitName" placeholder="Habit Name e.g. Wake up before 8am each day" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="habit_desc">Description:</label>
                        <input type="text" className="form-control" ref="habit_desc" id="habit_desc" placeholder="Why do you want to complete it?" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="habit_cat">Category:</label>
                        <input type="text" className="form-control" ref="habit_cat" id="habit_cat" placeholder="Health / Finance / Career" required />
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
                        <input type="number" className="form-control" ref="habit_target" name="days" step="1" min="1" max="30" placeholder="1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }

}

export default AddHabit;