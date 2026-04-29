import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProfileSettings from '../../warehouse/ProfileSettings';

describe('ProfileSettings Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ProfileSettings />
      </BrowserRouter>
    );
  });
});
