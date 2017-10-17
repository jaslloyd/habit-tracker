import React, { Component } from 'react';

class EditHabit extends Component {
    
    render() {        
        return (
            <div>
                <h1 className="m-3">Edit Habit</h1>
                <form>
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
                    </div>
                    <div className="form-group">
                        <label htmlFor="habit_target">How many days do you want to do this habit?</label>
                        <input type="number" className="form-control" ref="habit_target" name="days" step="1" min="1" max="30" placeholder="1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Habit</button>
                </form>
            </div>
        )
    }

}

export default EditHabit;