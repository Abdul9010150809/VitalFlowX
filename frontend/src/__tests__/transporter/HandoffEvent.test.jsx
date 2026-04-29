import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HandoffEvent from '../../transporter/HandoffEvent';

describe('HandoffEvent Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <HandoffEvent />
      </BrowserRouter>
    );
  });
});
