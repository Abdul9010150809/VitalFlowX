import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WarehouseDashboard from '../../warehouse/WarehouseDashboard';

describe('WarehouseDashboard Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <WarehouseDashboard />
      </BrowserRouter>
    );
  });
});
