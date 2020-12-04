import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";
// import axios from 'axios';

const particlesOptions = {
  particles: {
    line_linked: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800,
        },
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "signin",
      isSignedIn: false,
    };
  }

  //implementing the mount
  componentDidMount() {
    fetch("http://localhost:3000")
    .then(response => response.json())
    .then(console.log("mounted"))
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={{ particlesOptions }} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm />
            {/* {/} */}
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
