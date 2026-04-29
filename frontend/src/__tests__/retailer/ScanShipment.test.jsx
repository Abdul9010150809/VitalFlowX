import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ScanShipment from '../../retailer/ScanShipment';

describe('ScanShipment Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ScanShipment />
      </BrowserRouter>
    );
  });
});
