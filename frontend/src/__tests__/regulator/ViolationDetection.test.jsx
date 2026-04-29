import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ViolationDetection from '../../regulator/ViolationDetection';

describe('ViolationDetection Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ViolationDetection />
      </BrowserRouter>
    );
  });
});
