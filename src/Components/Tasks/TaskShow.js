import React from "react";
import moment from "moment";

class TaskShow extends React.Component {
  handleClick = task => {
    let nextWeek = moment().day(1 + 7);
    task = {
      flatmate_id: this.getNextFlatmate(),
      week: moment().day(1 + 7)._d,
      id: task.id
    };
    this.props.updateTaskOnServer(task);
  };

  getNextFlatmate = () => {
    let flatmatesArray = this.props.flat.flatmates.map(mate => mate.id);
    let index = flatmatesArray.indexOf(this.props.user.id);
    let nextFlatmate = (index + 1) % flatmatesArray.length;
    return flatmatesArray[nextFlatmate];
  };

  hasTasks = () =>
    this.props.tasks.filter(
      singleTask => singleTask.flatmate_id === this.props.user.id
    );

  hasTasksDue = () =>
    this.hasTasks().filter(
      usersTasks => moment(usersTasks.week).isoWeek() <= moment().isoWeek()
    );

  renderPage = () => {
    if (this.hasTasks().length > 0 && this.hasTasksDue().length > 0) {
      return (
        <>
          {this.hasTasksDue().map(task => {
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
        </>
      );
    } else if (this.hasTasks().length > 0 && this.hasTasksDue().length === 0) {
      return (
        <>
          <h4>All Your Tasks are COMPLETE!!</h4>
        </>
      );
    } else {
      return (
        <>
          <h4>You Don't have any tasks this week. Take a break!</h4>
        </>
      );
    }
  };

  render() {
    return <div className="taskSelectPage">{this.renderPage()}</div>;
  }
}
export default TaskShow;
