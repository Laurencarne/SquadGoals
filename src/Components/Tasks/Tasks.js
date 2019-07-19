import React from "react";
import TaskShow from "./TaskShow";
import TaskSelector from "./TaskSelector";
import "../../CSS/Task.css";

class Tasks extends React.Component {
  renderPage = () => {
    if (this.props.tasks.length > 0) {
      return (
        <>
          <h1> Your Tasks This Week </h1>
          <TaskShow tasks={this.props.tasks} />
        </>
      );
    } else {
      return (
        <>
          <h1>Select Your Tasks</h1>
          <TaskSelector />
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
