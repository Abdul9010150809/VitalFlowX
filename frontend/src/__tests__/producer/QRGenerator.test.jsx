import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import QRGenerator from '../../producer/QRGenerator';

describe('QRGenerator Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <QRGenerator />
      </BrowserRouter>
    );
  });
});
