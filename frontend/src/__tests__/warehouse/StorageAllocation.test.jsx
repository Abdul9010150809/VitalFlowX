import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StorageAllocation from '../../warehouse/StorageAllocation';

describe('StorageAllocation Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <StorageAllocation />
      </BrowserRouter>
    );
  });
});
