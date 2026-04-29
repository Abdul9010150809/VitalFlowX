import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SLACompliance from '../../warehouse/SLACompliance';

describe('SLACompliance Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SLACompliance />
      </BrowserRouter>
    );
  });
});
