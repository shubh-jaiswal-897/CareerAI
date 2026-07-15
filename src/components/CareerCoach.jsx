import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  User,
  AlertCircle
} from 'lucide-react';

export default function CareerCoach({ apiKey, context }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I am your AI Career Coach. I can help you prepare for job interviews, review your resume structure, or choose the right technologies to study. What's on your mind today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  // Quick prompt triggers
  const quickPrompts = [
    { label: "🎙️ Mock Interview", text: "Start a mock interview for my target role. Ask me one technical or behavioral question." },
    { label: "📝 Optimize Resume", text: "Can you give me key recommendations on how to structure a resume for ATS systems?" },
    { label: "💰 Salary Negotiate", text: "How should I handle negotiations for salary when receiving a job offer?" },
    { label: "🚀 Learn Frameworks", text: "Which programming languages or frameworks are currently in highest demand?" }
  ];

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    if (!messageText) {
      setInput('');
    }

    const updatedMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(updatedMessages);
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey || ''
        },
        body: JSON.stringify({
          messages: updatedMessages,
          context: context // Passes shared career goal, skills, and resume details
        })
      });

      const result = await response.json();
      if (result.success) {
        setMessages(prev => [...prev, result.message]);
      } else {
        setError(result.error || 'Failed to receive a response.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection to server failed. Verify the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={styles.container} className="glass-card">
      {/* HEADER */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={styles.iconWrapper}>
            <MessageSquare size={18} color="#ffffff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', color: '#ffffff' }}>AI Career Coach</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {context?.goal ? `Target: ${context.goal}` : 'General Guidance Mode'}
            </span>
          </div>
        </div>

        {/* Small badge showing mock vs live status */}
        <span style={{
          ...styles.modeBadge,
          backgroundColor: apiKey ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
          color: apiKey ? 'var(--success)' : 'var(--warning)',
          borderColor: apiKey ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'
        }}>
          {apiKey ? 'Live Coach' : 'Demo Coach'}
        </span>
      </div>

      {/* CHAT BUBBLES WINDOW */}
      <div style={styles.chatWindow}>
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div key={idx} style={{
              ...styles.messageRow,
              justifyContent: isUser ? 'flex-end' : 'flex-start'
            }}>
              {/* Coach Avatar (only for assistant) */}
              {!isUser && (
                <div style={styles.avatarCoach}>
                  <Sparkles size={14} color="var(--primary)" />
                </div>
              )}

              {/* Message Bubble */}
              <div style={{
                ...styles.bubble,
                backgroundColor: isUser ? 'var(--primary)' : 'rgba(255, 255, 255, 0.03)',
                borderColor: isUser ? 'var(--primary)' : 'var(--border-color)',
                borderBottomRightRadius: isUser ? '4px' : '14px',
                borderBottomLeftRadius: isUser ? '14px' : '4px',
                boxShadow: isUser ? '0 4px 12px rgba(99, 102, 241, 0.2)' : 'none'
              }}>
                <p style={styles.bubbleText}>
                  {msg.content}
                </p>
              </div>

              {/* User Avatar (only for user) */}
              {isUser && (
                <div style={styles.avatarUser}>
                  <User size={14} color="#ffffff" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {loading && (
          <div style={styles.messageRow}>
            <div style={styles.avatarCoach}>
              <Sparkles size={14} color="var(--primary)" />
            </div>
            <div style={{ ...styles.bubble, backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'var(--border-color)' }}>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div style={styles.errorAlert}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* QUICK SUGGESTIONS PILLS */}
      <div style={styles.suggestionsContainer}>
        {quickPrompts.map((prompt, idx) => (
          <button 
            key={idx} 
            onClick={() => handleSend(prompt.text)}
            style={styles.suggestionPill}
            disabled={loading}
          >
            {prompt.label}
          </button>
        ))}
      </div>

      {/* INPUT CONTAINER */}
      <div style={styles.inputBar}>
        <input 
          type="text" 
          className="input-field" 
          placeholder={loading ? "Coach is replying..." : "Ask your coach about interview prep, resumes, roadmaps..."}
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        />
        <button 
          className="btn btn-primary" 
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          style={styles.sendButton}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

// Inline styling classes for AI Coach
const styles = {
  container: {
    height: '600px',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid var(--border-color)',
    background: 'rgba(10, 15, 30, 0.2)',
  },
  iconWrapper: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'var(--grad-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeBadge: {
    padding: '0.25rem 0.5rem',
    borderRadius: '6px',
    fontSize: '0.7rem',
    fontWeight: '600',
    border: '1px solid',
  },
  chatWindow: {
    flex: 1,
    padding: '1.5rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '0.75rem',
    maxWidth: '85%',
  },
  avatarCoach: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarUser: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bubble: {
    padding: '0.75rem 1.1rem',
    borderRadius: '14px',
    border: '1px solid',
  },
  bubbleText: {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    whiteSpace: 'pre-line',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.15)',
    borderRadius: '8px',
    color: '#ff6b6b',
    fontSize: '0.8rem',
    margin: '0.5rem 0',
  },
  suggestionsContainer: {
    display: 'flex',
    overflowX: 'auto',
    padding: '0.75rem 1.5rem',
    gap: '0.5rem',
    borderTop: '1px solid var(--border-color)',
    background: 'rgba(10, 15, 30, 0.1)',
    scrollbarWidth: 'none', // hide in firefox
  },
  suggestionPill: {
    flexShrink: 0,
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border-color)',
    borderRadius: '100px',
    padding: '0.4rem 0.85rem',
    color: 'var(--text-main)',
    fontSize: '0.75rem',
    cursor: 'pointer',
    fontFamily: 'var(--font-title)',
    transition: 'all 0.2s',
    outline: 'none',
  },
  inputBar: {
    display: 'flex',
    padding: '1rem 1.5rem 1.5rem',
    borderTop: '1px solid var(--border-color)',
    background: 'rgba(10, 15, 30, 0.2)',
  },
  sendButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    padding: '0 1.25rem',
  }
};
