import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateAlert from '../../inspector/CreateAlert';

describe('CreateAlert Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <CreateAlert />
      </BrowserRouter>
    );
  });
});
