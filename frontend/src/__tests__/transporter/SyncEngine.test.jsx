import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SyncEngine from '../../transporter/SyncEngine';

describe('SyncEngine Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SyncEngine />
      </BrowserRouter>
    );
  });
});
