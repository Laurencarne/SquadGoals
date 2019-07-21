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
    api.getCurrentFlatmate(token()).then(flatmate => {
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
  //   api.getNotes(token()).then(notes => this.setState({ notes }));
  // };

  onAddNoteClick = note => {
    api.addNoteToServer(note, token()).then(data => {
      this.setState({
        notes: [...this.state.notes, data]
      });
    });
  };

  onDeleteNoteClick = noteId => {
    api.deleteNoteFromServer(noteId, token()).then(data => {
      this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
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
    api.updateFlatmateProfile(profile, this.state.user.id, token()).then(data =>
      this.setState({
        user: data
      })
    );
  };
  ////////////////// FLAT /////////////////////
  createNewFlat = flat => {
    api.addFlatToServer(flat, token()).then(data => this.getUser());
  };

  // getFlatDetails = () => {
  //   api.getFlat(token()).then(flat => {
  //     if (!flat.error) {
  //       this.setState({ flat });
  //     }
  //   });
  // };

  addUserToFlat = flatInfo => {
    api.moveIn(token(), flatInfo).then(user => {
      if (!user.error) {
        this.getUser();
      } else {
        alert("Sorry those details don't seem quite right...");
      }
    });
  };
  ////////////////// TASKS /////////////////////
  // getMyTasks = () => {
  //   api.getTasks(token()).then(my_tasks => this.setState({ my_tasks }));
  // };

  addTasksToFlat = flat => {
    api.addTaskToFlatServer(token(), flat).then(data => {
      this.setState({
        tasks: [...this.state.tasks, data]
      });
    });
  };

  updateTaskOnServer = task => {
    api.updateTasks(token(), task).then(data => {
      this.setState({
        tasks: this.state.tasks.filter(data => data.id !== task.id)
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
      updateTaskOnServer
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
                  logged_in={logged_in}
                  onAddNoteClick={onAddNoteClick}
                  onDeleteNoteClick={onDeleteNoteClick}
                  user={user}
                  notes={notes}
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
                  updateTaskOnServer={updateTaskOnServer}
                  addTasksToFlat={addTasksToFlat}
                  user={user}
                  tasks={tasks}
                  flat={flat}
                  logged_in={logged_in}
                />
              )}
            />
            <Route
              path="/shopping"
              render={() => <ShoppingList items={items} />}
            />
            <Route path="/calendar" render={() => <Dnd />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
