import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuditTrail from '../../regulator/AuditTrail';

describe('AuditTrail Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AuditTrail />
      </BrowserRouter>
    );
  });
});
