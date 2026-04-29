import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RoutePlan from '../../producer/RoutePlan';

describe('RoutePlan Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <RoutePlan />
      </BrowserRouter>
    );
  });
});
