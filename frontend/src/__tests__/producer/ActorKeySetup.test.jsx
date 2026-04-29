import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ActorKeySetup from '../../producer/ActorKeySetup';

describe('ActorKeySetup Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ActorKeySetup />
      </BrowserRouter>
    );
  });
});
