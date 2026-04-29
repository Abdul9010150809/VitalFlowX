import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AcceptReject from '../../retailer/AcceptReject';

describe('AcceptReject Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AcceptReject />
      </BrowserRouter>
    );
  });
});
