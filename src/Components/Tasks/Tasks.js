import React from "react";
import TaskShow from "./TaskShow";
import TaskSelector from "./TaskSelector";
import moment from "moment";
import "../../CSS/Task.css";

class Tasks extends React.Component {
  renderPage = () => {
    if (this.props.tasks.length > 0) {
      return (
        <>
          <h2>
            Week Starting{" "}
            {moment()
              .isoWeekday(1)
              .format("dddd Do MMMM")}
          </h2>
          <TaskShow
            updateTaskOnServer={this.props.updateTaskOnServer}
            flat={this.props.flat}
            tasks={this.props.tasks}
            user={this.props.user}
          />
        </>
      );
    } else {
      return (
        <>
          <h1>Set Up Your Apartments Weekly Tasks</h1>
          <TaskSelector
            user={this.props.user}
            flat={this.props.flat}
            addTasksToFlat={this.props.addTasksToFlat}
          />
        </>
      );
    }
  };
  render() {
    return (
      <div className="page">
        <div>{this.renderPage()}</div>
      </div>
    );
  }
}

export default Tasks;
