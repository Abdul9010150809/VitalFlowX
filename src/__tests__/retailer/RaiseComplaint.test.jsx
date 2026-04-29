import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RaiseComplaint from '../../retailer/RaiseComplaint';

describe('RaiseComplaint Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <RaiseComplaint />
      </BrowserRouter>
    );
  });
});
