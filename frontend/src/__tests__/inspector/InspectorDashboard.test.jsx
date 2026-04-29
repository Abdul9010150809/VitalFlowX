import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import InspectorDashboard from '../../inspector/InspectorDashboard';

describe('InspectorDashboard Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <InspectorDashboard />
      </BrowserRouter>
    );
  });
});
