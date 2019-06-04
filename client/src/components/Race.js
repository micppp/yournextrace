import React from "react";
import moment from "moment";

const displayTime = time => {
  if (isNaN(parseInt(time))) {
    return "N/A";
  }

  return time;
};

const formatDistance = distance =>
  distance.map(d => {
    if (d === "marathon") {
      d = "42K";
    }

    if (d === "half marathon") {
      d = "21K";
    }

    return <li key={d}>{d}</li>;
  });

const Race = ({ title, location, postcode, date, time, raceUrl, distance }) => (
  <div>
    <h3>{title}</h3>
    <p>{location}</p>
    <p>{postcode}</p>
    <p>{moment(new Date(date)).format("dddd Do MMMM, YYYY")}</p>
    <p>{displayTime(time)}</p>
    <p>{raceUrl}</p>
    <ul>{formatDistance(distance)}</ul>
  </div>
);

export default Race;
