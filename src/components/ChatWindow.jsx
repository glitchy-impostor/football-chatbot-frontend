import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, RotateCcw } from 'lucide-react';
import { useChat } from '../hooks/useApi';
import Message from './Message';
import QuickActions from './QuickActions';
import { SAMPLE_QUERIES } from '../utils/teams';

function ChatWindow({ userContext, health }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const { messages, sendMessage, clearMessages, loading } = useChat();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const query = input.trim();
    setInput('');

    try {
      await sendMessage(query, {
        favorite_team: userContext.favoriteTeam,
        season: userContext.season,
      });
    } catch (err) {
      console.error('Send message error:', err);
    }
  };

  const handleQuickAction = (query) => {
    // Replace placeholders with user's team
    let finalQuery = query;
    if (userContext.favoriteTeam) {
      finalQuery = query.replace('{team}', userContext.favoriteTeam);
      finalQuery = finalQuery.replace('{opponent}', 'SF'); // Default opponent
    } else {
      finalQuery = query.replace('{team}', 'KC');
      finalQuery = finalQuery.replace('{opponent}', 'SF');
    }
    setInput(finalQuery);
    inputRef.current?.focus();
  };

  const handleSampleQuery = (query) => {
    setInput(query);
    inputRef.current?.focus();
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          // Welcome screen
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-3xl">🏈</span>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Football Analytics Chatbot
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
              Ask me about NFL teams, player stats, game situations, and strategic decisions.
              Powered by play-by-play data from 2016-2025.
            </p>

            {/* Quick Actions */}
            <QuickActions onSelect={handleQuickAction} />

            {/* Sample queries */}
            <div className="mt-8 w-full max-w-2xl">
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-3">
                Try asking:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SAMPLE_QUERIES.slice(0, 4).map((query, i) => (
                  <button
                    key={i}
                    onClick={() => handleSampleQuery(query)}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 
                             text-gray-700 dark:text-gray-300 rounded-full
                             hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>

            {/* Status indicator */}
            {health && (
              <div className="mt-8 flex items-center gap-2 text-sm text-gray-400">
                <div className={`w-2 h-2 rounded-full ${
                  health.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span>
                  {health.llm_available 
                    ? `Connected to ${health.llm_provider || 'LLM'}` 
                    : 'Running in pipeline mode'}
                </span>
              </div>
            )}
          </div>
        ) : (
          // Messages list
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message) => (
              <Message 
                key={message.id} 
                message={message}
                userContext={userContext}
              />
            ))}
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="loading-dots text-gray-400">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <div className="max-w-3xl mx-auto">
          {/* Clear chat button */}
          {messages.length > 0 && (
            <div className="flex justify-center mb-3">
              <button
                onClick={clearMessages}
                className="flex items-center gap-1.5 px-3 py-1 text-xs text-gray-500 
                         hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <RotateCcw size={12} />
                Clear chat
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about teams, players, or game situations..."
              className="input flex-1"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 mt-3">
            Data from nflfastR • 2016-2025 seasons
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;