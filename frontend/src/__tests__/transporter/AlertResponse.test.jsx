import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AlertResponse from '../../transporter/AlertResponse';

describe('AlertResponse Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AlertResponse />
      </BrowserRouter>
    );
  });
});
