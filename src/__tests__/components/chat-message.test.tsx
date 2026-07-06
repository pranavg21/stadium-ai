import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatMessageComponent } from '../../components/ui/chat-message';
import type { ChatMessage } from '../../lib/types';

describe('ChatMessageComponent', () => {
  const userMsg: ChatMessage = { id: '1', role: 'user', content: 'Hello', timestamp: new Date().toISOString() };
  const assistantMsg: ChatMessage = { id: '2', role: 'assistant', content: 'Hi there!', timestamp: new Date().toISOString() };

  it('renders user message', () => {
    render(<ChatMessageComponent message={userMsg} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders assistant message', () => {
    render(<ChatMessageComponent message={assistantMsg} />);
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('applies user class to user messages', () => {
    const { container } = render(<ChatMessageComponent message={userMsg} />);
    expect(container.querySelector('.user')).toBeInTheDocument();
  });

  it('applies assistant class to assistant messages', () => {
    const { container } = render(<ChatMessageComponent message={assistantMsg} />);
    expect(container.querySelector('.assistant')).toBeInTheDocument();
  });
});
