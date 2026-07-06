import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ErrorBoundary } from '../../components/ui/error-boundary';

function GoodChild(): React.JSX.Element {
  return <p>Working</p>;
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(<ErrorBoundary><GoodChild /></ErrorBoundary>);
    expect(screen.getByText('Working')).toBeInTheDocument();
  });
});
