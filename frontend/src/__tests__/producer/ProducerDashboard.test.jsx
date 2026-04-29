import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProducerDashboard from '../../producer/ProducerDashboard';

describe('ProducerDashboard Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ProducerDashboard />
      </BrowserRouter>
    );
  });
});
