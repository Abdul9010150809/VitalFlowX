import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SensorValidation from '../../inspector/SensorValidation';

describe('SensorValidation Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SensorValidation />
      </BrowserRouter>
    );
  });
});
