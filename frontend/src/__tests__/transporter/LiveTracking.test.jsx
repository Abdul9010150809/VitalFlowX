import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LiveTracking from '../../transporter/LiveTracking';

describe('LiveTracking Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <LiveTracking />
      </BrowserRouter>
    );
  });
});
