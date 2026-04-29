import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProducerDashboard from '../../producer/ProducerDashboard';
import { ShipmentProvider } from '../../context/ShipmentContext';

describe('ProducerDashboard Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ShipmentProvider>
          <ProducerDashboard />
        </ShipmentProvider>
      </BrowserRouter>
    );
  });
});
