import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

describe('App', () => {
  it('renders root layout elements', () => {
    render(<App />);
    expect(screen.getByText('StadiumAI')).toBeInTheDocument();
  });
});
