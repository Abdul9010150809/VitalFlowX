import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import InspectionQueue from '../../inspector/InspectionQueue';

describe('InspectionQueue Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <InspectionQueue />
      </BrowserRouter>
    );
  });
});
