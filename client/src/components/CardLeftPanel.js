import React from 'react';

const CardLeftPanel = (props) => (
  <div className="vertical-grid qLeftCard">
    <div className="qTitle">
      <span>Q.</span>
      {props.title} {props.metaData}
    </div>
    <div className="line" />
  </div>
);
export default CardLeftPanel;
