import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomerView from '../../retailer/CustomerView';

describe('CustomerView Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <CustomerView />
      </BrowserRouter>
    );
  });
});
