import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SensorBinding from '../../producer/SensorBinding';

describe('SensorBinding Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SensorBinding />
      </BrowserRouter>
    );
  });
});
