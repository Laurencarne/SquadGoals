import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import api from "../util/api";
import NavBar from "../Components/Foundation/NavBar";
import LandingPage from "../Components/Foundation/LandingPage";
import Footer from "../Components/Foundation/Footer";
import LoginComponent from "../Components/Login&SignUp/LoginComponent";
import SignupComponent from "../Components/Login&SignUp/SignupComponent";
import Profile from "../Components/Profile/Profile";
import Tasks from "../Components/Tasks/Tasks";
import ShoppingList from "../Components/Shopping/ShoppingList";
import Dnd from "../Components/Calendar/Dnd";
import BillsLandingPage from "../Components/Bills/BillsLandingPage";
import swal from "sweetalert2";

const token = () => localStorage.getItem("token");

class App extends React.Component {
  state = {
    logged_in: false,
    user: null,
    tasks: [],
    flat: null,
    events: [],
    notes: [],
    items: [],
    bills: [],
    flatmates: [],
    bill_splits: []
  };

  componentDidMount() {
    if (token()) {
      this.getUser();
    }
  }
  //////////////////// USER /////////////////////
  getUser = () => {
    api.getCurrentFlatmate().then(flatmate => {
      const {
        flat,
        bills,
        bill_splits,
        items,
        events,
        tasks,
        notes,
        ...user
      } = flatmate;

      if (flatmate.flat) {
        this.setState({
          logged_in: true,
          user,
          events,
          notes,
          items,
          flat,
          tasks,
          bills,
          flatmates: flat.flatmates,
          bill_splits
        });
      } else {
        this.setState({
          logged_in: true,
          user,
          events,
          notes,
          items
        });
      }
    });
  };
  //////////////////// NOTES /////////////////////
  onAddNoteClick = note => {
    api.addNoteToServer(note).then(data => {
      this.setState({
        notes: [...this.state.notes, data]
      });
    });
  };

  onDeleteNoteClick = noteId => {
    api.deleteNoteFromServer(noteId).then(data => {
      this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
      });
    });
  };
  //////////////////// EVENTS /////////////////////
  onAddEventClick = event => {
    api.addEventToServer(event).then(data => {
      this.setState({
        events: [...this.state.events, data]
      });
    });
  };

  onDeleteEventClick = eventId => {
    api.deleteEventFromServer(eventId).then(data => {
      this.setState({
        events: this.state.events.filter(event => event.id !== eventId)
      });
    });
  };
  /////////////// LOGIN /////////////////
  onLoginClicked = user => {
    api.login(user.username, user.password).then(data => {
      if (data.error) {
        swal.fire({
          title: "Opps...",
          text: "Those details do not seem quite right...",
          type: "error",
          confirmButtonText: "Try Again"
        });
      } else {
        localStorage.setItem("token", data.jwt);
        this.getUser();
      }
    });
  };
  ////////////////// SIGNUP /////////////////////
  signUpUserToServer = flatmate => {
    api.signup(flatmate).then(data => {
      if (data.error) {
        swal.fire({
          title: "Opps...",
          text: "Those details do not seem quite right...",
          type: "error",
          confirmButtonText: "Try Again"
        });
      } else {
        localStorage.setItem("token", data.jwt);
        this.getUser();
      }
    });
  };
  ////////////////// LOGOUT /////////////////////
  handleLogOut = () => {
    localStorage.clear("token");
    this.setState({
      logged_in: false,
      user: null,
      tasks: [],
      flat: null,
      events: [],
      notes: [],
      items: []
    });
  };
  ////////////////// PROFILE /////////////////////
  updateProfile = profile => {
    api.updateFlatmateProfile(profile, this.state.user.id).then(data =>
      this.setState({
        user: data
      })
    );
  };
  ////////////////// FLAT /////////////////////
  createNewFlat = flat => {
    api.addFlatToServer(flat).then(data => this.getUser());
  };
  addUserToFlat = flatInfo => {
    api.moveIn(flatInfo).then(user => {
      if (!user.error) {
        this.getUser();
      } else {
        swal.fire({
          title: "Opps...",
          text: "Those details do not seem quite right...",
          type: "error",
          confirmButtonText: "Try Again"
        });
      }
    });
  };
  updateFlat = flat => {
    api.updateFlatOnServer(flat).then(data => {
      this.setState({
        flat: data
      });
    });
  };
  ////////////////// TASKS /////////////////////
  addTasksToFlat = flat => {
    api.addTaskToFlatServer(flat).then(data => {
      this.setState({
        tasks: [...this.state.tasks, data]
      });
    });
  };

  updateTaskOnServer = task => {
    api.updateTasks(task).then(data => {
      this.setState({
        tasks: this.state.tasks.filter(data => data.id !== task.id)
      });
    });
  };

  deleteTask = taskId => {
    api.deleteTaskFromServer(taskId).then(data => {
      this.setState({
        tasks: this.state.tasks.filter(task => task.id !== taskId)
      });
    });
  };
  ////////////////// SHOPPING LIST /////////////////////
  addShoppingItemToFlat = item => {
    api.addShoppingItemToServer(item).then(data => {
      this.setState({
        items: [...this.state.items, data]
      });
    });
  };
  deleteItemFromShoppingList = itemId => {
    api.deleteItemFromServer(itemId).then(data => {
      this.setState({
        items: this.state.items.filter(item => item.id !== itemId)
      });
    });
  };

  addBill = bill => {
    return api.addBillToServer(bill).then(data => {
      this.setState({
        bills: [...this.state.bills, data]
      });
    });
  };

  updateBillSplitDetails = billSplit => {
    return api.updateBillSplit(billSplit).then(data => {
      this.setState({
        bills: data
      });
    });
  };

  ////////////////// RENDER /////////////////////
  render() {
    const {
      logged_in,
      user,
      items,
      tasks,
      flat,
      events,
      notes,
      bills,
      flatmates
    } = this.state;
    const {
      handleLogOut,
      createNewFlat,
      addUserToFlat,
      onAddNoteClick,
      onDeleteNoteClick,
      onLoginClicked,
      signUpUserToServer,
      updateProfile,
      addTasksToFlat,
      updateTaskOnServer,
      addShoppingItemToFlat,
      deleteItemFromShoppingList,
      deleteTask,
      getUser,
      onAddEventClick,
      onDeleteEventClick,
      updateFlat,
      addBill,
      updateBillSplitDetails
    } = this;
    return (
      <Router>
        <div className="App">
          <NavBar
            user={user}
            logged_in={logged_in}
            handleLogOut={handleLogOut}
            createNewFlat={createNewFlat}
            addUserToFlat={addUserToFlat}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <LandingPage
                  flat={flat}
                  events={events}
                  logged_in={logged_in}
                  onAddNoteClick={onAddNoteClick}
                  onDeleteNoteClick={onDeleteNoteClick}
                  user={user}
                  notes={notes}
                  onAddEventClick={onAddEventClick}
                  onDeleteEventClick={onDeleteEventClick}
                />
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginComponent
                  logged_in={logged_in}
                  onLoginClicked={onLoginClicked}
                />
              )}
            />
            <Route
              path="/signup"
              exact
              render={() => (
                <SignupComponent
                  logged_in={logged_in}
                  signUpUserToServer={signUpUserToServer}
                />
              )}
            />
            <Route
              path="/profile"
              exact
              render={() => (
                <Profile
                  updateProfile={updateProfile}
                  user={user}
                  logged_in={logged_in}
                  flat={flat}
                  updateFlat={updateFlat}
                />
              )}
            />
            <Route
              path="/tasks"
              exact
              render={() => (
                <Tasks
                  getUser={getUser}
                  updateTaskOnServer={updateTaskOnServer}
                  addTasksToFlat={addTasksToFlat}
                  user={user}
                  tasks={tasks}
                  flat={flat}
                  logged_in={logged_in}
                  deleteTask={deleteTask}
                />
              )}
            />
            <Route
              path="/shopping"
              exact
              render={() => (
                <ShoppingList
                  items={items}
                  user={user}
                  logged_in={logged_in}
                  addShoppingItemToFlat={addShoppingItemToFlat}
                  deleteItemFromShoppingList={deleteItemFromShoppingList}
                />
              )}
            />
            <Route
              path="/bills"
              exact
              render={() => (
                <BillsLandingPage
                  bills={bills}
                  logged_in={logged_in}
                  flatmates={flatmates}
                  user={user}
                  addBill={addBill}
                  updateBillSplitDetails={updateBillSplitDetails}
                />
              )}
            />
            <Route
              path="/calendar"
              exact
              render={props => (
                <Dnd
                  logged_in={logged_in}
                  user={user}
                  // key={Math.floor(Math.random() * 20)}
                  key={props.location.key}
                  {...props}
                />
              )}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
