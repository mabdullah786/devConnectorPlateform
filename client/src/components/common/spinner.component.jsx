import React from 'react';

import spinner from '../../img/spinner.gif';
const Spinner = () => {
  return (
    <React.Fragment>
      <img
        src={spinner}
        style={{ display: 'block', margin: 'auto', width: '200px' }}
        alt='Loading,,,,,,,,'
      />
    </React.Fragment>
  );
};

export default Spinner;
