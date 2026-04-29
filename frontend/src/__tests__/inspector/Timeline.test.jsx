import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Timeline from '../../inspector/Timeline';

describe('Timeline Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Timeline />
      </BrowserRouter>
    );
  });
});
