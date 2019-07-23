import React from "react";
import tasks from "./TaskList";
import AddMyOwnTask from "./AddMyOwnTask";
import moment from "moment";

let taskHolder = [];

class TaskSelector extends React.Component {
  state = {
    clicked: false,
    selected: []
  };

  handleClick = task => {
    if (!taskHolder.includes(task)) {
      taskHolder.push(task);
    } else if (taskHolder.includes(task)) {
      taskHolder = taskHolder.filter(t => t.name !== task.name);
    }
    this.renderStyle(task.avatar);
  };

  renderStyle = avatar => {
    this.setState({
      tasks: tasks.map(task => {
        if (task.avatar === avatar) {
          task.checked = !task.checked;
        }
        return task;
      })
    });
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

  toggleAddMyOwn = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  addMyOwn = () => {
    if (this.state.clicked) {
      return (
        <AddMyOwnTask
          handleClick={this.handleClick}
          toggleAddMyOwn={this.toggleAddMyOwn}
          getRandomFlatmate={this.props.getRandomFlatmate}
          user={this.props.user}
          getRandomFlatmate={this.getRandomFlatmate}
          addTasksToFlat={this.props.addTasksToFlat}
        />
      );
    }
  };

  render() {
    return (
      <>
        <div className="taskButtonsDiv">
          <button className="taskButton" onClick={this.toggleAddMyOwn}>
            Create My Own
          </button>
          <button className="taskButton" onClick={this.handleSubmit}>
            Update
          </button>
        </div>
        <div className="taskSelectPage">
          {tasks
            .filter(
              task => !this.props.myTasks.find(a => a.avatar == task.avatar)
            )
            .map(taskToShow => {
              return (
                <div
                  onClick={() => this.handleClick(taskToShow)}
                  className="taskSelectDiv"
                >
                  <div
                    style={{
                      backgroundColor: taskToShow.checked ? "#5ce1e6" : null
                    }}
                    className="taskSelectHolder"
                  >
                    <h1>{taskToShow.name}</h1>
                    <img src={taskToShow.avatar} alt="icon" />
                    <p>{taskToShow.description}</p>
                  </div>
                </div>
              );
            })}
        </div>
        {this.addMyOwn()}
      </>
    );
  }
}
export default TaskSelector;
