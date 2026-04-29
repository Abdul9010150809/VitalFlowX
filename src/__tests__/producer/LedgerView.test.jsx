import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LedgerView from '../../producer/LedgerView';

describe('LedgerView Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <LedgerView />
      </BrowserRouter>
    );
  });
});
