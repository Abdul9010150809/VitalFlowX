import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegulatorDashboard from '../../regulator/RegulatorDashboard';

describe('RegulatorDashboard Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <RegulatorDashboard />
      </BrowserRouter>
    );
  });
});
