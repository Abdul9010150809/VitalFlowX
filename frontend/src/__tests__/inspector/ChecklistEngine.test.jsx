import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ChecklistEngine from '../../inspector/ChecklistEngine';

describe('ChecklistEngine Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ChecklistEngine />
      </BrowserRouter>
    );
  });
});
