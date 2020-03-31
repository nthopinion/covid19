import React from 'react';

// give it it's own css file to improve usability

/*
accepts an epoch time val and returns the correctly formatted time
*/
// const formatTime = epTime => {

// }

export default function TimeLocation(props) {
  const { name, time, location } = props;

  return (
    <div className="time-location-container">
      {name ? <div className="time-location">name</div> : ''}

      {time ? (
        <div className="time-location">
          <i className="clock outline icon" />
          <div> {time}</div>
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
