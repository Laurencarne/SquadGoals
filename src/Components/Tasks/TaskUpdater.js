import React from "react";
import tasks from "./TaskList";
import moment from "moment";

let taskHolder = [];

class TaskUpdater extends React.Component {
  state = {
    clicked: false,
    selected: []
  };

  handleDeleteClick = task => {
    this.props.deleteTask(task.id);
  };

  render() {
    return (
      <>
        <button onClick={this.props.handleClick}>Back</button>
        <div className="taskSelectPage">
          {this.props.tasks.map(task => {
            return (
              <div
                onClick={() => this.handleDeleteClick(task)}
                className="taskSelectDiv"
              >
                <div
                  style={{ backgroundColor: task.checked ? "#5ce1e6" : null }}
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
export default TaskUpdater;
