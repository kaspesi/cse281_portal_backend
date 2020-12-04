import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Map from "./components/Map/Map";
import "./App.css";
import hotelName from "./components/hotelName/hotelName";

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
  constructor(props) {
    super(props);
    this.state = {
      route: "signin",
      isSignedIn: false,
      map: null,
      markers: [],
      hotel: [],
    };
  }

  componentDidMount() {}

  setMapRef = (mapRef) => {
    this.setState({ map: mapRef });
  };

  setMarkers = (marker) => {
    this.setState({ markers: [marker] });
  };

  setName = (hotel_name) => {
    this.setState({ hotel: hotel_name });
  };

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
            <ImageLinkForm map={this.state.map} setMarkers={this.setMarkers} />
            <Map setMapRef={this.setMapRef} markers={this.state.markers} />

            {/* {/} */}
          </div>
        ) : this.state.route === "signin" || this.state.route === "signout" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
