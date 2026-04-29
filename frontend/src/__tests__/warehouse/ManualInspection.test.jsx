import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ManualInspection from '../../warehouse/ManualInspection';

describe('ManualInspection Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ManualInspection />
      </BrowserRouter>
    );
  });
});
