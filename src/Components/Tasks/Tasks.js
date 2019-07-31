import React from "react";
import { Redirect } from "react-router-dom";
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
    this.props.getUser();
    this.setState({
      clicked: !this.state.clicked
    });
  };

  renderPage = () => {
    if (!this.props.logged_in && this.props.user) {
      return <Redirect to="/" />;
    } else if (this.props.logged_in && this.state.clicked && this.props.user) {
      return (
        <>
          <div className="noCover">
            <img src="https://i.imgur.com/8RiY85k.jpg?1" alt="Cleaning" />
          </div>
          <div className="page">
            <div>
              <button className="taskBackButton" onClick={this.handleClick}>
                <img src="https://i.imgur.com/sW5hYLx.png" alt="Task Icon" />
              </button>
              <h1 className="taskHeader">
                Remove Exsisting Tasks From Your Apartment
              </h1>
              <TaskUpdater
                tasks={this.props.tasks}
                user={this.props.user}
                flat={this.props.flat}
                addTasksToFlat={this.props.addTasksToFlat}
                deleteTask={this.props.deleteTask}
                handleClick={this.handleClick}
              />
            </div>
            <>
              <h1 className="taskHeader">Add New Tasks To Your Apartment</h1>
              <TaskSelector
                user={this.props.user}
                flat={this.props.flat}
                addTasksToFlat={this.props.addTasksToFlat}
                myTasks={this.props.tasks}
              />
            </>
          </div>
        </>
      );
    } else if (this.props.tasks.length > 0 && this.props.user.username) {
      return (
        <>
          <div className="noCover">
            <img src="https://i.imgur.com/8RiY85k.jpg?1" alt="Cleaning" />
          </div>

          <div className="page">
            <div>
              <button className="taskButtonEdit" onClick={this.handleClick}>
                Update Flat's Tasks
              </button>
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
            </div>
          </div>
        </>
      );
    } else if (this.props.logged_in && this.props.user) {
      return (
        <>
          <div className="page">
            <div>
              <h1 className="taskHeader">
                Set Up Your Apartments Weekly Tasks
              </h1>
              <TaskSelector
                user={this.props.user}
                flat={this.props.flat}
                addTasksToFlat={this.props.addTasksToFlat}
                myTasks={this.props.tasks}
              />
            </div>
          </div>
        </>
      );
    }
  };

  render() {
    return <>{this.renderPage()}</>;
  }
}

export default Tasks;
