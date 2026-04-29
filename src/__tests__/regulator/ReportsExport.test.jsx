import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReportsExport from '../../regulator/ReportsExport';

describe('ReportsExport Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ReportsExport />
      </BrowserRouter>
    );
  });
});
