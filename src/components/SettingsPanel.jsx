import { X, Server, Cpu, Database, Check } from 'lucide-react';
import { NFL_TEAMS, getTeam } from '../utils/teams';

function SettingsPanel({ userContext, onUpdateContext, onClose, health }) {
  const favoriteTeam = getTeam(userContext.favoriteTeam);

  // Group teams by conference and division
  const conferences = ['AFC', 'NFC'];
  const divisions = ['East', 'North', 'South', 'West'];

  const getTeamsByDivision = (conf, div) => 
    Object.values(NFL_TEAMS).filter(t => t.conference === conf && t.division === div);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* API Status */}
          <div className="card p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Server size={16} />
              API Status
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className={`flex items-center gap-1.5 ${
                  health?.status === 'healthy' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {health?.status === 'healthy' && <Check size={14} />}
                  {health?.status || 'Unknown'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">LLM Provider</span>
                <span className="text-gray-900 dark:text-white capitalize">
                  {health?.llm_provider || 'None (Pipeline mode)'}
                </span>
              </div>
              
              {health?.llm_model && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Model</span>
                  <span className="text-gray-900 dark:text-white font-mono text-xs">
                    {health.llm_model}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Models Loaded</span>
                <span className={health?.models_loaded ? 'text-green-600' : 'text-yellow-600'}>
                  {health?.models_loaded ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Favorite Team */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Favorite Team</h3>
            
            {favoriteTeam && (
              <div 
                className="flex items-center gap-3 p-3 rounded-lg mb-3"
                style={{ backgroundColor: favoriteTeam.primary + '15' }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: favoriteTeam.primary }}
                >
                  {favoriteTeam.abbr}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {favoriteTeam.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {favoriteTeam.conference} {favoriteTeam.division}
                  </div>
                </div>
                <button
                  onClick={() => onUpdateContext({ favoriteTeam: null })}
                  className="ml-auto text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <select
              value={userContext.favoriteTeam || ''}
              onChange={(e) => onUpdateContext({ favoriteTeam: e.target.value || null })}
              className="input"
            >
              <option value="">Select a team...</option>
              {conferences.map(conf => (
                <optgroup key={conf} label={conf}>
                  {divisions.map(div => 
                    getTeamsByDivision(conf, div).map(team => (
                      <option key={team.abbr} value={team.abbr}>
                        {team.name}
                      </option>
                    ))
                  )}
                </optgroup>
              ))}
            </select>

            <p className="text-xs text-gray-500 mt-2">
              Your favorite team will be used as default context for queries
            </p>
          </div>

          {/* Season */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Default Season</h3>
            
            <select
              value={userContext.season}
              onChange={(e) => onUpdateContext({ season: parseInt(e.target.value) })}
              className="input"
            >
              {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map(year => (
                <option key={year} value={year}>{year} Season</option>
              ))}
            </select>

            <p className="text-xs text-gray-500 mt-2">
              Team profiles and player stats will use this season by default
            </p>
          </div>

          {/* Data Info */}
          <div className="card p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
              <Database size={16} />
              About the Data
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              This chatbot is powered by nflfastR play-by-play data covering NFL seasons 
              from 2016 to 2025. It includes EPA (Expected Points Added), win probability, 
              and detailed play-level statistics.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button onClick={onClose} className="btn btn-primary">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;