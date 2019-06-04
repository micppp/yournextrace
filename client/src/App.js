import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Races from "./components/Races";

function App() {
  const [loading, setLoading] = useState(true);
  const [races, setRaces] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      const races = await res.json();

      setLoading(false);
      setRaces(races);
    }

    fetchData();
  }, []);

  return (
    <div className={loading ? "app app--loading" : "app"}>
      {loading ? <Loader /> : <Races races={races} />}
    </div>
  );
}

export default App;
