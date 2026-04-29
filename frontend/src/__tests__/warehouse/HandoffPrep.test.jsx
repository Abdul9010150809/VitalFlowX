import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HandoffPrep from '../../warehouse/HandoffPrep';

describe('HandoffPrep Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <HandoffPrep />
      </BrowserRouter>
    );
  });
});
