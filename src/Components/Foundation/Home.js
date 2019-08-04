import React, { Component } from "react";
import "../../CSS/Home.css";

class Home extends Component {
  render() {
    return (
      <div className="landingPageContainer">
        <div>
          <iframe
            className="video"
            autoplay
            loop
            width="420"
            height="340"
            src="https://www.youtube.com/embed/N8UoKgd669A?version=3&autoplay=1&loop=1&playlist=PL_LRhFyQ7d9fi8Hda2k_Bw_AYgGBvgmT;showinfo=0"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="landingPageBottom">
          <h1> Squad Goals </h1>
          <h3>What is it?</h3>
          <p>Welcome to Squad Goals!</p>
          <p>
            This is an app to keep your flat details in one place. Log when your
            bills are due and details about your place.
          </p>
          <p>
            You can create of join a flat with your flatmates and keep track of
            your communal shopping list, household events and weekly tasks.
          </p>
          <p>
            Sign up and start creating your own flat and invite your house mates
            to join you or take a look around a premade user:
          </p>
          <p>Username: lauren Password: 12345</p>
        </div>
      </div>
    );
  }
}

export default Home;
