// Frontend Configuration
// Override with VITE_API_URL environment variable

// API Configuration
export const API_CONFIG = {
  // Base URL for the API
  // Default: Krish's hosted backend
  // Override with .env: VITE_API_URL=http://localhost:8000
  baseUrl: import.meta.env.VITE_API_URL || 'https://web-production-12eeb.up.railway.app',
  
  // Route prefix for football endpoints
  footballPrefix: '/football',
  
  // Timeout for API requests (ms)
  timeout: 30000,
};

// Build full endpoint URLs
export const ENDPOINTS = {
  // Football Analytics
  footballChat: `${API_CONFIG.baseUrl}${API_CONFIG.footballPrefix}/chat`,
  footballHealth: `${API_CONFIG.baseUrl}${API_CONFIG.footballPrefix}/health`,
  footballRateLimit: `${API_CONFIG.baseUrl}${API_CONFIG.footballPrefix}/rate-limit/status`,
  footballTeamProfile: (team) => `${API_CONFIG.baseUrl}${API_CONFIG.footballPrefix}/teams/${team}/profile`,
  footballTeamTendencies: (team) => `${API_CONFIG.baseUrl}${API_CONFIG.footballPrefix}/teams/${team}/tendencies`,
  footballCompareTeams: `${API_CONFIG.baseUrl}${API_CONFIG.footballPrefix}/teams/compare`,
  footballSituation: `${API_CONFIG.baseUrl}${API_CONFIG.footballPrefix}/situation/analyze`,
  footballTeams: `${API_CONFIG.baseUrl}${API_CONFIG.footballPrefix}/teams`,
};

export default API_CONFIG;