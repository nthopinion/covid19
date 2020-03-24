import React from 'react';

const Iframe = (props) => (
  <iframe
    title={props.title}
    src={props.src}
    styles={props.style}
    width={props.width}
    height={props.height}
  />
);
export default Iframe;
