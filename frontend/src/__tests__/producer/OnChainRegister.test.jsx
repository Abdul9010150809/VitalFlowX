import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OnChainRegister from '../../producer/OnChainRegister';

describe('OnChainRegister Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <OnChainRegister />
      </BrowserRouter>
    );
  });
});
