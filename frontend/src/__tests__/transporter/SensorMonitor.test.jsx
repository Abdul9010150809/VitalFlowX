import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SensorMonitor from '../../transporter/SensorMonitor';

describe('SensorMonitor Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SensorMonitor />
      </BrowserRouter>
    );
  });
});
