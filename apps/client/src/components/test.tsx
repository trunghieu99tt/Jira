import React from 'react';

const A = () => (
  <div>
    <B />
  </div>
);

const B = () => (
  <div>
    <C />
  </div>
);

const C = () => (
  <div>
    <D />
  </div>
);

const D = () => {
  return <div>D</div>;
};

export default A;
