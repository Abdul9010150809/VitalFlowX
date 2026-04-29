import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../../common/NotFoundPage';

describe('NotFoundPage Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
  });
});
