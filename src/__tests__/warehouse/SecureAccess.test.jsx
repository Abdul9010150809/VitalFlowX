import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SecureAccess from '../../warehouse/SecureAccess';

describe('SecureAccess Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SecureAccess />
      </BrowserRouter>
    );
  });
});
