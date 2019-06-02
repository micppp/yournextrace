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
        {races.map(race => (
          <div>{race.title}</div>
        ))}
      </div>
    );
  }
}

export default App;
