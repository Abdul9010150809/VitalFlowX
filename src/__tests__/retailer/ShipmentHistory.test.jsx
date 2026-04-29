import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ShipmentHistory from '../../retailer/ShipmentHistory';

describe('ShipmentHistory Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ShipmentHistory />
      </BrowserRouter>
    );
  });
});
