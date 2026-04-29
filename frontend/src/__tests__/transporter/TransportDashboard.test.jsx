import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TransportDashboard from '../../transporter/TransportDashboard';

describe('TransportDashboard Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <TransportDashboard />
      </BrowserRouter>
    );
  });
});
