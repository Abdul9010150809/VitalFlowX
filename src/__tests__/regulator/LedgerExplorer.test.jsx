import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LedgerExplorer from '../../regulator/LedgerExplorer';

describe('LedgerExplorer Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <LedgerExplorer />
      </BrowserRouter>
    );
  });
});
