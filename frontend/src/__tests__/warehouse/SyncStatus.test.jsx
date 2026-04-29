import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SyncStatus from '../../warehouse/SyncStatus';

describe('SyncStatus Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SyncStatus />
      </BrowserRouter>
    );
  });
});
