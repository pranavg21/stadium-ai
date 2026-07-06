import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppSidebar } from '../../components/layout/app-sidebar';

describe('AppSidebar', () => {
  it('renders sidebar navigation links', async () => {
    await act(async () => {
      render(<MemoryRouter><AppSidebar /></MemoryRouter>);
    });
    expect(screen.getByRole('navigation', { name: /Main navigation/i })).toBeInTheDocument();
  });
});
