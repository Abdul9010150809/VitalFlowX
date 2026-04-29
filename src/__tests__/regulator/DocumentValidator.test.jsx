import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DocumentValidator from '../../regulator/DocumentValidator';

describe('DocumentValidator Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DocumentValidator />
      </BrowserRouter>
    );
  });
});
