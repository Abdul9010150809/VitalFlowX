import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ColdMonitoring from '../../warehouse/ColdMonitoring';

describe('ColdMonitoring Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ColdMonitoring />
      </BrowserRouter>
    );
  });
});
