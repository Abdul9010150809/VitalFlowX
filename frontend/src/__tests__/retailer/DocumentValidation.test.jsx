import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DocumentValidation from '../../retailer/DocumentValidation';

describe('DocumentValidation Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DocumentValidation />
      </BrowserRouter>
    );
  });
});
