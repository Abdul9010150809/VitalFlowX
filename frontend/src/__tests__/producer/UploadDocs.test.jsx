import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UploadDocs from '../../producer/UploadDocs';

describe('UploadDocs Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <UploadDocs />
      </BrowserRouter>
    );
  });
});
