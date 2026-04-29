import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RetailDashboard from '../../retailer/RetailDashboard';

describe('RetailDashboard Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <RetailDashboard />
      </BrowserRouter>
    );
  });
});
