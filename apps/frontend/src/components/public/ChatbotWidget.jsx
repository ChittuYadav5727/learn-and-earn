import { useState } from 'react';
import { publicService } from '../../services/publicService';
import { useToast } from '../../hooks/useToast';

const quickActionMap = {
  'Browse Courses': 'browse-courses',
  'How to Earn': 'how-to-earn',
  Help: 'help',
};

function BotIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a1 1 0 0 1 1 1v1.07A7 7 0 0 1 19 11v4a3 3 0 0 1-3 3h-1.09l1.13 2.25a.8.8 0 0 1-1.08 1.05L11.3 19H8a3 3 0 0 1-3-3v-5a7 7 0 0 1 6-6.93V3a1 1 0 0 1 1-1Zm-3.5 9.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm7 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
    </svg>
  );
}

export default function ChatbotWidget({ quickActions = [] }) {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi, I can help you explore courses, earning paths, and provider workflows.',
    },
  ]);

  async function sendMessage(payload, label = payload.message || payload.action) {
    if (isLoading) {
      return;
    }

    if (payload.message) {
      setMessages((current) => [...current, { id: `${Date.now()}-user`, role: 'user', content: payload.message }]);
    }

    setIsLoading(true);
    try {
      const response = await publicService.sendChatMessage(payload);
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          content: response.message,
          suggestions: response.suggestions || [],
        },
      ]);
    } catch (error) {
      showToast({
        title: 'Chatbot unavailable',
        description: 'The assistant could not reach the backend right now.',
        tone: 'error',
      });
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!message.trim()) {
      return;
    }
    sendMessage({ message: message.trim() });
  }

  return (
    <>
      <button className="chatbot-trigger" type="button" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen}>
        <BotIcon />
        <span>Assistant</span>
      </button>

      {isOpen ? (
        <section className="chatbot-window">
          <header className="chatbot-header">
            <div>
              <p className="eyebrow">AI concierge</p>
              <h3>Learn & Earn Guide</h3>
            </div>
            <button className="ghost-button small" type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </header>

          <div className="chatbot-quick-actions">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className="quick-action"
                type="button"
                onClick={() => sendMessage({ action: action.id }, action.label)}
              >
                {action.label}
              </button>
            ))}
          </div>

          <div className="chatbot-messages">
            {messages.map((entry) => (
              <article key={entry.id} className={`chat-message chat-${entry.role}`}>
                <p>{entry.content}</p>
                {entry.suggestions?.length ? (
                  <div className="chat-suggestions">
                    {entry.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        className="suggestion-chip"
                        type="button"
                        onClick={() =>
                          sendMessage({
                            action: quickActionMap[suggestion] || 'help',
                            message: suggestion,
                          })
                        }
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
            {isLoading ? <div className="loading-skeleton chat-skeleton" /> : null}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about courses, rewards, or provider workflows" />
            <button className="primary-button" type="submit" disabled={isLoading}>
              Send
            </button>
          </form>
        </section>
      ) : null}
    </>
  );
}
