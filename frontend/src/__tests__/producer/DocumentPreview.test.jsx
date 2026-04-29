import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DocumentPreview from '../../producer/DocumentPreview';

describe('DocumentPreview Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DocumentPreview />
      </BrowserRouter>
    );
  });
});
