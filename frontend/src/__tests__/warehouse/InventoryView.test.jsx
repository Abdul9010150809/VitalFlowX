import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import InventoryView from '../../warehouse/InventoryView';

describe('InventoryView Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <InventoryView />
      </BrowserRouter>
    );
  });
});
