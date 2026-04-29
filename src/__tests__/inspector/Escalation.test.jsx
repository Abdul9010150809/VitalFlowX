import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Escalation from '../../inspector/Escalation';

describe('Escalation Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Escalation />
      </BrowserRouter>
    );
  });
});
