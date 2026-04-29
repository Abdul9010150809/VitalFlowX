import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AlertsMonitor from '../../producer/AlertsMonitor';

describe('AlertsMonitor Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AlertsMonitor />
      </BrowserRouter>
    );
  });
});
