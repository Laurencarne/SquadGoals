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

const token = () => localStorage.getItem("token");

class App extends React.Component {
  state = {
    logged_in: false,
    user: null,
    tasks: [],
    flat: null,
    events: [],
    notes: [],
    items: []
  };

  componentDidMount() {
    if (token()) {
      this.getUser();
    }
  }
  //////////////////// USER /////////////////////
  getUser = () => {
    api.getCurrentFlatmate().then(flatmate => {
      const { flat, items, events, tasks, notes, ...user } = flatmate;
      this.setState({
        logged_in: true,
        user,
        flat,
        events,
        notes,
        tasks,
        items
      });
    });
  };
  //////////////////// NOTES /////////////////////

  // getNotes = () => {
  //   api.getNotes().then(notes => this.setState({ notes }));
  // };

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
        alert("Something is wrong with your credentials");
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
        alert("Something is wrong with your credentials");
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

  // getFlatDetails = () => {
  //   api.getFlat().then(flat => {
  //     if (!flat.error) {
  //       this.setState({ flat });
  //     }
  //   });
  // };

  addUserToFlat = flatInfo => {
    api.moveIn(flatInfo).then(user => {
      if (!user.error) {
        this.getUser();
      } else {
        alert("Sorry those details don't seem quite right...");
      }
    });
  };
  ////////////////// TASKS /////////////////////
  // getMyTasks = () => {
  //   api.getTasks().then(my_tasks => this.setState({ my_tasks }));
  // };

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
  ////////////////// RENDER /////////////////////
  render() {
    const { logged_in, user, items, tasks, flat, events, notes } = this.state;
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
      onDeleteEventClick
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
            <Route path="/calendar" render={() => <Dnd events={events} />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
