import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GlobalOverview from '../../regulator/GlobalOverview';

describe('GlobalOverview Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <GlobalOverview />
      </BrowserRouter>
    );
  });
});
