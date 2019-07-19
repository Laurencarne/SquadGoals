import React from "react";
import tasks from "./TaskList";

let taskHolder = [];

class TaskSelector extends React.Component {
  state = {
    color: null,
    clicked: false
  };
  handleClick = task => {
    if (!taskHolder.includes(task)) {
      taskHolder.push(task);
    } else if (taskHolder.includes(task)) {
      taskHolder = taskHolder.filter(t => t.task != task.task);
    }
    console.log(taskHolder);

    this.setState({
      clicked: !this.state.clicked,
      color: this.state.clicked ? null : "#5ce1e6"
    });
  };

  render() {
    return (
      <div className="taskSelectPage">
        {tasks.map(task => {
          return (
            <div
              onClick={() => this.handleClick(task)}
              className="taskDisplayPage"
            >
              <div
                style={{ backgroundColor: this.state.color }}
                className="taskDisplayHolder"
              >
                <h1>{task.task}</h1>
                <img src={task.img} alt="icon" />
                <p>{task.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default TaskSelector;
