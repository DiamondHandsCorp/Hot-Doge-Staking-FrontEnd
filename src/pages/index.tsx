import React from 'react';
import { StakingProvider } from 'contexts';
import { Staking } from './Staking';

export const Home = () => {
  return (
    <StakingProvider>
      <Staking />
    </StakingProvider>
  );
};
