import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import IncidentReport from '../../transporter/IncidentReport';

describe('IncidentReport Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <IncidentReport />
      </BrowserRouter>
    );
  });
});
