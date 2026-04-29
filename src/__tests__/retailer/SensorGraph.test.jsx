import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SensorGraph from '../../retailer/SensorGraph';

describe('SensorGraph Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SensorGraph />
      </BrowserRouter>
    );
  });
});
