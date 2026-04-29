import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DocumentCheck from '../../inspector/DocumentCheck';

describe('DocumentCheck Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DocumentCheck />
      </BrowserRouter>
    );
  });
});
