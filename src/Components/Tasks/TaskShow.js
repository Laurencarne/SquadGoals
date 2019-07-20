import React from "react";
import moment from "moment";

class TaskShow extends React.Component {
  // setNextWeeksDate = () => {
  //   const dayINeed = 1; // for Thursday
  //   const today = moment().isoWeekday();
  //   if (today <= dayINeed) {
  //     console.log(moment().isoWeekday(dayINeed));
  //   } else {
  //     let date = moment()
  //       .add(1, "weeks")
  //       .isoWeekday(dayINeed);
  //     console.log(date._d);
  //   }
  // };

  handleClick = task => {
    let nextWeek = moment().day(1 + 7);
    task = {
      flatmate_id: this.getNextFlatmate(),
      week: moment().day(1 + 7)._d,
      id: task.id
    };

    this.props.updateTaskOnServer(task);
  };
  // clickme = task => {
  //   console.log(task.week);
  // };

  getNextFlatmate = () => {
    let flatmatesArray = this.props.flat.flatmates.map(mate => mate.id);
    let index = flatmatesArray.indexOf(this.props.user.id);
    let nextFlatmate = (index + 1) % flatmatesArray.length;
    return flatmatesArray[nextFlatmate];
  };

  renderPage = () => {
    if (
      this.props.tasks.filter(
        singleTask => singleTask.flatmate_id === this.props.user.id
      ).length > 0
    ) {
      return (
        <>
          {this.props.tasks
            .filter(singleTask => singleTask.flatmate_id === this.props.user.id)
            .filter(
              usersTask =>
                //   console.log(
                //     moment(usersTask.week).format("dddd Do MMMM YYYY"),
                //     moment()
                //       .day(1)
                //       .format("dddd Do MMMM YYYY")
                //   )

                moment(usersTask.week).format("dddd Do MMMM YYYY") ===
                moment()
                  .day(1)
                  .format("dddd Do MMMM YYYY")
            )
            .map(task => {
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
    } else {
      return (
        <>
          <h4>All Your Tasks are COMPLETE!!</h4>
        </>
      );
    }
  };

  render() {
    return <div className="taskSelectPage">{this.renderPage()}</div>;
  }
}
export default TaskShow;
