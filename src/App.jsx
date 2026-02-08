import { useState, useEffect } from 'react';
import { Moon, Sun, Settings, MessageSquare, Zap } from 'lucide-react';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import SettingsPanel from './components/SettingsPanel';
import { useHealth } from './hooks/useApi';

function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // User context
  const [userContext, setUserContext] = useState(() => {
    const saved = localStorage.getItem('userContext');
    return saved ? JSON.parse(saved) : {
      favoriteTeam: null,
      season: 2023,
    };
  });

  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  // Health check
  const { health, checkHealth, loading: healthLoading } = useHealth();

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Save user context
  useEffect(() => {
    localStorage.setItem('userContext', JSON.stringify(userContext));
  }, [userContext]);

  // Check API health on mount
  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  const updateContext = (updates) => {
    setUserContext(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="flex-shrink-0 h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🏈</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white">
                Football Analytics
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Powered by nflfastR data
              </p>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="flex items-center gap-2">
            {/* API Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700">
              <div className={`w-2 h-2 rounded-full ${
                health?.status === 'healthy' ? 'bg-green-500' : 
                healthLoading ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
              }`} />
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {health?.llm_provider ? `${health.llm_provider}` : 'Pipeline'}
              </span>
            </div>

            {/* Toggle Sidebar (mobile) */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="btn-ghost p-2 rounded-lg lg:hidden"
            >
              <MessageSquare size={20} />
            </button>

            {/* Settings */}
            <button
              onClick={() => setShowSettings(true)}
              className="btn-ghost p-2 rounded-lg"
              title="Settings"
            >
              <Settings size={20} />
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn-ghost p-2 rounded-lg"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
          userContext={userContext}
          onUpdateContext={updateContext}
        />

        {/* Chat Area */}
        <main className="flex-1 flex flex-col min-w-0">
          <ChatWindow 
            userContext={userContext}
            health={health}
          />
        </main>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsPanel
          userContext={userContext}
          onUpdateContext={updateContext}
          onClose={() => setShowSettings(false)}
          health={health}
        />
      )}
    </div>
  );
}

export default App;
