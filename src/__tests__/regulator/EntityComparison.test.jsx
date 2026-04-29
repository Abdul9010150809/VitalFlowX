import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EntityComparison from '../../regulator/EntityComparison';

describe('EntityComparison Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <EntityComparison />
      </BrowserRouter>
    );
  });
});
