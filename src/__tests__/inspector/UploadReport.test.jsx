import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UploadReport from '../../inspector/UploadReport';

describe('UploadReport Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <UploadReport />
      </BrowserRouter>
    );
  });
});
