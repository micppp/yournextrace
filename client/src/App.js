import React, { Component } from "react";

class App extends Component {
  state = {
    races: []
  };
  componentWillMount = async () => {
    const res = await fetch("/api");
    const races = await res.json();

    this.setState({
      races
    });
  };

  render() {
    const { races } = this.state;

    return (
      <div className="app">
        {races.map(
          ({ title, location, postcode, date, time, raceUrl, distance }) => (
            <div>
              <h3>{title}</h3>
              <p>{location}</p>
              <p>{postcode}</p>
              <p>{date}</p>
              <p>{time}</p>
              <p>{raceUrl}</p>
              <p>{distance}</p>
            </div>
          )
        )}
      </div>
    );
  }
}

export default App;
