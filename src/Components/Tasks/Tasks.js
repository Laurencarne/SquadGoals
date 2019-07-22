import React from "react";
import TaskShow from "./TaskShow";
import TaskSelector from "./TaskSelector";
import TaskUpdater from "./TaskUpdater";
import moment from "moment";
import "../../CSS/Task.css";

class Tasks extends React.Component {
  state = {
    clicked: false
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  renderPage = () => {
    if (this.state.clicked) {
      return (
        <>
          <>
            <h1>Remove Exsisting Tasks From Your Apartment</h1>
            <TaskUpdater
              tasks={this.props.tasks}
              user={this.props.user}
              flat={this.props.flat}
              addTasksToFlat={this.props.addTasksToFlat}
              deleteTask={this.props.deleteTask}
            />
          </>
          <>
            <h1>Add New Tasks To Your Apartment</h1>
            <TaskSelector
              user={this.props.user}
              flat={this.props.flat}
              addTasksToFlat={this.props.addTasksToFlat}
              myTasks={this.props.tasks}
            />
          </>
        </>
      );
    }
    if (this.props.tasks.length > 0) {
      return (
        <>
          <button onClick={this.handleClick}> Update Flat's Tasks </button>
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
            myTasks={this.props.tasks}
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
