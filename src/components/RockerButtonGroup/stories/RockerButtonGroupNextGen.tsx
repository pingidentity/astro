import React from 'react';

import { RockerButton, RockerButtonGroup } from '../../../index';

const RockerButtonGroupNextGen = () => {
  return (
    <RockerButtonGroup>
      <RockerButton name="and" key="and">And</RockerButton>
      <RockerButton name="or" key="or">Or</RockerButton>
      <RockerButton name="maybe" key="maybe">Maybe</RockerButton>
    </RockerButtonGroup>
  );
};

export default RockerButtonGroupNextGen;
