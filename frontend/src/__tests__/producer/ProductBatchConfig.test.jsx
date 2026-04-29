import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductBatchConfig from '../../producer/ProductBatchConfig';

describe('ProductBatchConfig Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ProductBatchConfig />
      </BrowserRouter>
    );
  });
});
