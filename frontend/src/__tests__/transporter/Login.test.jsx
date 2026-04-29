import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../transporter/Login';

describe('Login Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });
});
