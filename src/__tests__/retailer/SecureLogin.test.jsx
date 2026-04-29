import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SecureLogin from '../../retailer/SecureLogin';

describe('SecureLogin Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SecureLogin />
      </BrowserRouter>
    );
  });
});
