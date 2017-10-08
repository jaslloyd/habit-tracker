import React, { Component } from 'react';
import HabitItem from './HabitItem'

class Habit extends Component {
  /**
   * When a habit mounts for each entry in a habit display habit item
  */
  onCompleted(index){
    // todo: duplicated code removal!!
    let {id, completed} = this.props.habit
    console.log('Habit ', index, completed)
    if(index <= completed){
      console.log('Deselected a habit')
      this.props.onUpdated(id, completed - 1);
    }else{
      console.log('Selected a habit')
      this.props.onUpdated(id, completed + 1)
    }
  }

  render() {
    const {name, description, target, completed} = this.props.habit;
    const habitItemElements = Array(target).fill().map((_, i) => <HabitItem key={i+1} index={i+1} completed={completed} onCompleted={this.onCompleted.bind(this)} />);

    return (
      <div className="row">
        <div className="col-md-4">
          <h3>Habit: {name}</h3>
          <p>Description: {description}</p>
          
        </div>
        <div className="col-md-6">
          {/* Each habit is a list of habit items (checkboxes whatever) */}
          {habitItemElements}
        </div>
        <div className="col-md-2">
          <p>Progress: {completed} / {target} Days</p>
        </div>
      </div>
    );
  }
}

export default Habit;
