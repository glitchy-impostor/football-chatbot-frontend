// Frontend Configuration
// This file contains configuration that can be overridden via environment variables

// API Configuration
// For standalone backend: http://localhost:8000
// For Krish's merged backend: https://web-production-12eeb.up.railway.app
export const API_CONFIG = {
  // Base URL for the API
  // Override with VITE_API_URL environment variable
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // Route prefix for football endpoints
  // The merged API uses /football/ prefix, standalone uses /football/ too
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

// Default configuration for Krish's hosted version
// Users can fork and change VITE_API_URL to use their own backend
export const DEFAULT_HOSTED_URL = 'https://web-production-12eeb.up.railway.app';

export default API_CONFIG;
