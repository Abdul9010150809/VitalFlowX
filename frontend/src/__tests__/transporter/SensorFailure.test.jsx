import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SensorFailure from '../../transporter/SensorFailure';

describe('SensorFailure Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SensorFailure />
      </BrowserRouter>
    );
  });
});
