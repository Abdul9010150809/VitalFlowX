import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SensorAudit from '../../regulator/SensorAudit';

describe('SensorAudit Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SensorAudit />
      </BrowserRouter>
    );
  });
});
