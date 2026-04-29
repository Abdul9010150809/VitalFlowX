import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EntryPage from '../../common/EntryPage';

describe('EntryPage Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <EntryPage />
      </BrowserRouter>
    );
  });
});
