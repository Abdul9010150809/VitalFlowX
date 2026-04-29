import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ComplianceAnalytics from '../../regulator/ComplianceAnalytics';

describe('ComplianceAnalytics Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ComplianceAnalytics />
      </BrowserRouter>
    );
  });
});
