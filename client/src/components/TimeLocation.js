import React from 'react';

// give it it's own css file to improve usability

const DAY = 1000 * 60 * 60 * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = MONTH * 12;

// for testing purposes
window.DAY = DAY;
window.WEEK = WEEK;
window.MONTH = MONTH;
window.YEAR = YEAR;

/*
accepts an epoch/utc time val and returns the correctly formatted time
*/
const formatTime = (time) => {
  const date = new Date(time);

  const curTime = Date.now();
  const curDate = new Date(curTime);

  const timeElapsed = curTime - time;

  // time stamp is from this day
  if (
    curDate.getDate() === date.getDate() &&
    curDate.getMonth() === date.getMonth() &&
    curDate.getFullYear() === date.getFullYear()
  ) {
    // return time
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours % 12 || 12}:${(minutes >= 10 ? '' : '0') + minutes} ${
      (hours + 1) / 12 > 1 ? 'PM' : 'AM'
    }`;
  }
  if (timeElapsed < WEEK) {
    // time stamp is from this week
    if (timeElapsed < DAY) {
      return 'Yesterday';
    }
    if (timeElapsed < 2 * DAY) {
      return `1 day ago`;
    }
    return `${Math.floor(timeElapsed / DAY)} days ago`;
  }
  if (timeElapsed < MONTH) {
    // time stamp is from last 30 days
    if (timeElapsed < 2 * WEEK) return '1 week ago';

    return `${Math.floor(timeElapsed / WEEK)} weeks ago`;
  }
  if (timeElapsed < YEAR) {
    // time stamp is from last 360 days
    if (timeElapsed < MONTH * 2) {
      return '1 month ago';
    }
    return `${Math.floor(timeElapsed / MONTH)} months ago`;
  }
  // over a year ago
  if (timeElapsed < YEAR * 2) {
    return '1 year ago';
  }
  return `${Math.floor(timeElapsed / YEAR)} years ago`;
};
window.formatTime = formatTime;

export default function TimeLocation(props) {
  const { name, time, location } = props;

  return (
    <div className="time-location-container">
      {name ? <div className="time-location">{name}</div> : ''}

      {time ? (
        <div className="time-location">
          <i className="clock outline icon" />
          <div> {formatTime(time)}</div>
        </div>
      ) : (
        ''
      )}

      {location ? (
        <div className="time-location">
          <i className="map marker icon" />
          <div> {location}</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
