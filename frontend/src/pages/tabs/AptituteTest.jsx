import React from 'react';
import { useParams } from 'react-router-dom';

const AptitudeTest = () => {
  const { questionLimit, timeLimit } = useParams();

  return (
    <div>
      <h2>Test Started!</h2>
      <p>Questions: {questionLimit}</p>
      <p>Time: {timeLimit} minutes</p>
      {/* You can load test questions here */}
    </div>
  );
};

export default AptitudeTest;
