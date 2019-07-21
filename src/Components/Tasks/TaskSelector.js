import React from "react";
import tasks from "./TaskList";
import moment from "moment";

let taskHolder = [];

class TaskSelector extends React.Component {
  state = {
    color: null,
    clicked: false,
    selected: []
  };

  handleClick = task => {
    if (!taskHolder.includes(task)) {
      taskHolder.push(task);
    } else if (taskHolder.includes(task)) {
      taskHolder = taskHolder.filter(t => t.name !== task.name);
    }
    // this.setState({
    //   clicked: !this.state.clicked,
    //   color: this.state.clicked ? null : "#5ce1e6"
    // });
  };

  getRandomFlatmate = counter => {
    let flatmatesArray = this.props.flat.flatmates.map(mate => mate.id);
    let index = counter;
    let nextFlatmate = (index + 1) % flatmatesArray.length;
    return flatmatesArray[nextFlatmate];
  };

  handleSubmit = () => {
    let counter = 0;
    let week = moment().isoWeekday(1)._d;
    taskHolder.forEach(task => {
      let flatId = { flat_id: this.props.user.flat_id };
      let flatmate_id = this.getRandomFlatmate(counter);
      this.props.addTasksToFlat({ ...task, ...flatId, flatmate_id, week });
      // console.log({ ...task, ...flatId, flatmate_id, week });
      counter++;
    });
  };

  render() {
    return (
      <>
        <button onClick={this.handleSubmit}>Update</button>
        <div className="taskSelectPage">
          {tasks.map(task => {
            return (
              <div
                onClick={() => this.handleClick(task)}
                className="taskSelectDiv"
              >
                <div
                  style={{ backgroundColor: this.state.color }}
                  className="taskSelectHolder"
                >
                  <h1>{task.name}</h1>
                  <img src={task.avatar} alt="icon" />
                  <p>{task.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
export default TaskSelector;
