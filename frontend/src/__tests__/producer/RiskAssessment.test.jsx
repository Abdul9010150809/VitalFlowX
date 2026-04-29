import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RiskAssessment from '../../producer/RiskAssessment';

describe('RiskAssessment Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <RiskAssessment />
      </BrowserRouter>
    );
  });
});
