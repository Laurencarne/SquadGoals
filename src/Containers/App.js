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
      const { flat, items, events, notes, tasks, ...user } = flatmate;
      this.setState({
        logged_in: true,
        user,
        tasks,
        flat,
        events,
        notes,
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
  ////////////////// RENDER /////////////////////
  render() {
    const { logged_in, user, tasks, flat, events, notes, items } = this.state;
    const {
      handleLogOut,
      createNewFlat,
      addUserToFlat,
      onAddNoteClick,
      onDeleteNoteClick,
      onLoginClicked,
      signUpUserToServer,
      updateProfile
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
                <Tasks user={user} tasks={tasks} logged_in={logged_in} />
              )}
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
