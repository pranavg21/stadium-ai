import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { App } from '../App';

describe('App', () => {
  it('renders root layout elements', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText('StadiumAI')).toBeInTheDocument();
  });
});
