import { X, Heart, Calendar } from 'lucide-react';
import { NFL_TEAMS, getTeam } from '../utils/teams';

function Sidebar({ isOpen, onClose, userContext, onUpdateContext }) {
  const favoriteTeam = getTeam(userContext.favoriteTeam);

  // Group teams by conference and division
  const conferences = ['AFC', 'NFC'];
  const divisions = ['East', 'North', 'South', 'West'];

  const getTeamsByDivision = (conf, div) => 
    Object.values(NFL_TEAMS).filter(t => t.conference === conf && t.division === div);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white">Settings</h2>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Favorite Team */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Heart size={14} />
              Favorite Team
            </label>
            
            {favoriteTeam && (
              <div 
                className="flex items-center gap-3 p-3 rounded-lg mb-3"
                style={{ backgroundColor: favoriteTeam.primary + '15' }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: favoriteTeam.primary }}
                >
                  {favoriteTeam.abbr}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {favoriteTeam.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {favoriteTeam.conference} {favoriteTeam.division}
                  </div>
                </div>
              </div>
            )}

            <select
              value={userContext.favoriteTeam || ''}
              onChange={(e) => onUpdateContext({ favoriteTeam: e.target.value || null })}
              className="input text-sm"
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
          </div>

          {/* Season */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar size={14} />
              Season
            </label>
            <select
              value={userContext.season}
              onChange={(e) => onUpdateContext({ season: parseInt(e.target.value) })}
              className="input text-sm"
            >
              {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Analysis will use this season's data
            </p>
          </div>

          {/* Quick team buttons */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Popular Teams
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['KC', 'SF', 'BAL', 'DET', 'PHI', 'DAL', 'BUF', 'MIA'].map(abbr => {
                const team = getTeam(abbr);
                const isSelected = userContext.favoriteTeam === abbr;
                return (
                  <button
                    key={abbr}
                    onClick={() => onUpdateContext({ favoriteTeam: abbr })}
                    className={`
                      aspect-square rounded-lg flex items-center justify-center 
                      text-xs font-bold transition-all
                      ${isSelected 
                        ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800' 
                        : 'hover:scale-105'}
                    `}
                    style={{ 
                      backgroundColor: team.primary,
                      color: team.secondary === '#FFFFFF' || team.secondary === '#FFB612' || team.secondary === '#FFC20E' 
                        ? team.secondary 
                        : '#FFFFFF'
                    }}
                    title={team.name}
                  >
                    {abbr}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Data from nflfastR
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;