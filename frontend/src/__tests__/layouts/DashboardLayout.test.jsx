import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

describe('DashboardLayout Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DashboardLayout role="producer" links={[]} />
      </BrowserRouter>
    );
  });
});
