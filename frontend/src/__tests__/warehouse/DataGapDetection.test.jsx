import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DataGapDetection from '../../warehouse/DataGapDetection';

describe('DataGapDetection Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DataGapDetection />
      </BrowserRouter>
    );
  });
});
