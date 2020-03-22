import React from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import '../styles/Loading.css';
const Loading = () => {
  return (
    <div className="real">
      <LoopCircleLoading color="#177BB2" className="circle" />
      <h2 className="loading" style={{ textAlign: 'center' }}>
        Loading
      </h2>
    </div>
  );
};

export default Loading;
