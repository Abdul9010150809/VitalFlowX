import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../../common/LoginPage';

describe('LoginPage Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  });
});
