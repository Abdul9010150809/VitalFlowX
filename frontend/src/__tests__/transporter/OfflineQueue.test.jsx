import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OfflineQueue from '../../transporter/OfflineQueue';

describe('OfflineQueue Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <OfflineQueue />
      </BrowserRouter>
    );
  });
});
