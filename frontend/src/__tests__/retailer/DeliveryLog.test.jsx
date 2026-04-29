import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DeliveryLog from '../../retailer/DeliveryLog';

describe('DeliveryLog Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DeliveryLog />
      </BrowserRouter>
    );
  });
});
