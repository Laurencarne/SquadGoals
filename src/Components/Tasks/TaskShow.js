import React from "react";

class TaskShow extends React.Component {
  handleClick = task => {
    console.log(task);
  };

  render() {
    return (
      <div className="taskSelectPage">
        {this.props.tasks.map(task => {
          return (
            <div
              onClick={() => this.handleClick(task)}
              className="taskDisplayPage"
            >
              <div className="taskDisplayHolder">
                <h1>{task.name}</h1>
                <img src={task.avatar} alt="icon" />
                <p>{task.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default TaskShow;
