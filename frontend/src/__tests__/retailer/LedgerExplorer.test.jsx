import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LedgerExplorer from '../../retailer/LedgerExplorer';

describe('LedgerExplorer Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <LedgerExplorer />
      </BrowserRouter>
    );
  });
});
