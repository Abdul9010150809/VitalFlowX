import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ExceptionCase from '../../producer/ExceptionCase';

describe('ExceptionCase Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ExceptionCase />
      </BrowserRouter>
    );
  });
});
