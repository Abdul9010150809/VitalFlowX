import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DeliveryConfirm from '../../transporter/DeliveryConfirm';

describe('DeliveryConfirm Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DeliveryConfirm />
      </BrowserRouter>
    );
  });
});
