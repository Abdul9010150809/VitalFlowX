import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AlertAnalytics from '../../regulator/AlertAnalytics';

describe('AlertAnalytics Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AlertAnalytics />
      </BrowserRouter>
    );
  });
});
