import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FinalReport from '../../retailer/FinalReport';

describe('FinalReport Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <FinalReport />
      </BrowserRouter>
    );
  });
});
