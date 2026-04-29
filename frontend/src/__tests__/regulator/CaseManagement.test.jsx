import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CaseManagement from '../../regulator/CaseManagement';

describe('CaseManagement Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <CaseManagement />
      </BrowserRouter>
    );
  });
});
