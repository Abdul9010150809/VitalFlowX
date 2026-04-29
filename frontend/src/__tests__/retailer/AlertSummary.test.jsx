import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AlertSummary from '../../retailer/AlertSummary';

describe('AlertSummary Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AlertSummary />
      </BrowserRouter>
    );
  });
});
