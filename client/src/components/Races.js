import React from "react";
import Race from "./Race";

export default function Races({ races }) {
  return races.map(
    ({ title, location, postcode, date, time, raceUrl, distance }) => (
      <Race
        key={title}
        title={title}
        location={location}
        postcode={postcode}
        date={date}
        time={time}
        raceUrl={raceUrl}
        distance={distance}
      />
    )
  );
}
