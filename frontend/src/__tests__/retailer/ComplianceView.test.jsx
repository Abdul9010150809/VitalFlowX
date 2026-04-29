import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ComplianceView from '../../retailer/ComplianceView';

describe('ComplianceView Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ComplianceView />
      </BrowserRouter>
    );
  });
});
