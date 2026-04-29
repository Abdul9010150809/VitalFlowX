import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SecureAuth from '../../inspector/SecureAuth';

describe('SecureAuth Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SecureAuth />
      </BrowserRouter>
    );
  });
});
