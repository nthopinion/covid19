import React from 'react';

const SVG = ({
  style = {},
  width = '15',
  viewBox = '0 0 15 17',
  className = '',
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M9.4 2L9 0H0V17H2V10H7.6L8 12H15V2H9.4Z" />
  </svg>
);

export default SVG;
