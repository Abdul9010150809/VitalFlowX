import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UploadDocs from '../../warehouse/UploadDocs';

describe('UploadDocs Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <UploadDocs />
      </BrowserRouter>
    );
  });
});
