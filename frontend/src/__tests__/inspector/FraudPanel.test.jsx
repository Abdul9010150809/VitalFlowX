import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FraudPanel from '../../inspector/FraudPanel';

describe('FraudPanel Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <FraudPanel />
      </BrowserRouter>
    );
  });
});
