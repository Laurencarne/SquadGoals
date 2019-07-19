import React from "react";
import tasks from "./TaskList";

let taskHolder = [];

class TaskSelector extends React.Component {
  state = {
    color: null,
    clicked: false,
    selected: []
  };

  handleClick = x => {
    if (!taskHolder.includes(x)) {
      taskHolder.push(x);
    } else if (taskHolder.includes(x)) {
      taskHolder = taskHolder.filter(t => t.name !== x.name);
    }
    console.log(taskHolder);

    // this.setState({
    //   clicked: !this.state.clicked,
    //   color: this.state.clicked ? null : "#5ce1e6"
    // });
  };

  handleSubmit = () => {
    let pair = { flat_id: this.props.user.flat_id };
    taskHolder.forEach(task => console.log({ ...task, ...pair }));
    taskHolder.forEach(task => this.props.addTaskToFlat({ ...task, ...pair }));
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
