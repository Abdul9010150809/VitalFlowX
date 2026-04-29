import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReceiveShipment from '../../warehouse/ReceiveShipment';

describe('ReceiveShipment Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ReceiveShipment />
      </BrowserRouter>
    );
  });
});
