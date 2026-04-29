import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PickupEvent from '../../transporter/PickupEvent';

describe('PickupEvent Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <PickupEvent />
      </BrowserRouter>
    );
  });
});
