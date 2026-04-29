import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SensorAnalytics from '../../warehouse/SensorAnalytics';

describe('SensorAnalytics Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SensorAnalytics />
      </BrowserRouter>
    );
  });
});
