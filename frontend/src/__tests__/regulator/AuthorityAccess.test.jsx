import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthorityAccess from '../../regulator/AuthorityAccess';

describe('AuthorityAccess Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AuthorityAccess />
      </BrowserRouter>
    );
  });
});
