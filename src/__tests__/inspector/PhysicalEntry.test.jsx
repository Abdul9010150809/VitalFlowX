import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhysicalEntry from '../../inspector/PhysicalEntry';

describe('PhysicalEntry Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <PhysicalEntry />
      </BrowserRouter>
    );
  });
});
