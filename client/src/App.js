import React, { Component } from "react";
import Loader from "./components/Loader";
import Races from "./components/Races";

class App extends Component {
  state = {
    loading: true,
    races: []
  };

  componentWillMount = async () => {
    const res = await fetch("/api");
    const races = await res.json();

    this.setState({
      loading: false,
      races
    });
  };

  render() {
    const { loading, races } = this.state;

    return (
      <div className={loading ? "app app--loading" : "app"}>
        {loading ? <Loader /> : <Races races={races} />}
      </div>
    );
  }
}

export default App;
