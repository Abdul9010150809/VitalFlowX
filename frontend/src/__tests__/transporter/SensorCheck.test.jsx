import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SensorCheck from '../../transporter/SensorCheck';

describe('SensorCheck Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SensorCheck />
      </BrowserRouter>
    );
  });
});
