import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApprovalPanel from '../../regulator/ApprovalPanel';

describe('ApprovalPanel Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ApprovalPanel />
      </BrowserRouter>
    );
  });
});
