import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TemperatureGraph from '../../transporter/TemperatureGraph';

describe('TemperatureGraph Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <TemperatureGraph />
      </BrowserRouter>
    );
  });
});
