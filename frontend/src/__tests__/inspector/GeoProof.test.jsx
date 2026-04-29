import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GeoProof from '../../inspector/GeoProof';

describe('GeoProof Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <GeoProof />
      </BrowserRouter>
    );
  });
});
