import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PassFail from '../../inspector/PassFail';

describe('PassFail Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <PassFail />
      </BrowserRouter>
    );
  });
});
