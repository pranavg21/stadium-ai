import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatPanel } from '../../components/ui/chat-panel';

describe('ChatPanel', () => {
  it('renders chat messages and input', () => {
    render(<ChatPanel messages={[]} isLoading={false} onSend={() => {}} placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });
});
