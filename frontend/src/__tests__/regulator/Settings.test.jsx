import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Settings from '../../regulator/Settings';

describe('Settings Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Settings />
      </BrowserRouter>
    );
  });
});
