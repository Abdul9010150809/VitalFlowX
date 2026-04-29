import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TempRulesConfig from '../../producer/TempRulesConfig';

describe('TempRulesConfig Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <TempRulesConfig />
      </BrowserRouter>
    );
  });
});
