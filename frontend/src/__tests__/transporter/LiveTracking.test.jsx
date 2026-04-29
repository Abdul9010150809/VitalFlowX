import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LiveTracking from '../../transporter/LiveTracking';
import { ShipmentProvider } from '../../context/ShipmentContext';

describe('LiveTracking Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ShipmentProvider>
          <LiveTracking />
        </ShipmentProvider>
      </BrowserRouter>
    );
  });
});
