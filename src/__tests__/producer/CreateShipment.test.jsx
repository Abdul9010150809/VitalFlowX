import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateShipment from '../../producer/CreateShipment';

describe('CreateShipment Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <CreateShipment />
      </BrowserRouter>
    );
  });
});
