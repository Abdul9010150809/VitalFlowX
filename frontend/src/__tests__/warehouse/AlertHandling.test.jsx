import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AlertHandling from '../../warehouse/AlertHandling';

describe('AlertHandling Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AlertHandling />
      </BrowserRouter>
    );
  });
});
