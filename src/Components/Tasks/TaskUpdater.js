import React from "react";

class TaskUpdater extends React.Component {
  handleDeleteClick = task => {
    this.props.deleteTask(task.id);
  };

  render() {
    return (
      <>
        <div className="taskSelectPage">
          {this.props.tasks.map(task => {
            return (
              <div
                onClick={() => this.handleDeleteClick(task)}
                className="taskSelectDiv"
              >
                <div className="taskSelectHolder">
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
