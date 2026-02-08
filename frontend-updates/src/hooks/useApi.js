/**
 * Football Analytics API Hook
 * 
 * Handles all communication with the football analytics backend.
 * Supports both standalone and merged API deployments.
 */

import { useState, useCallback } from 'react';
import { ENDPOINTS, API_CONFIG } from '../config';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Generate or retrieve session ID for rate limiting
  const [sessionId] = useState(() => {
    const stored = sessionStorage.getItem('football-session-id');
    if (stored) return stored;
    const newId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('football-session-id', newId);
    return newId;
  });

  /**
   * Send a chat message to the football analytics API
   */
  const sendMessage = useCallback(async (message, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(ENDPOINTS.footballChat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          session_id: sessionId,
          season: options.season || 2025,
          use_llm: options.useLlm !== false,
          context: options.context || {},
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      setLoading(false);
      return data;
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, [sessionId]);

  /**
   * Get team profile
   */
  const getTeamProfile = useCallback(async (team, season = 2025) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `${ENDPOINTS.footballTeamProfile(team)}?season=${season}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Team not found: ${team}`);
      }
      
      const data = await response.json();
      setLoading(false);
      return data;
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  /**
   * Compare two teams
   */
  const compareTeams = useCallback(async (team1, team2, season = 2025) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `${ENDPOINTS.footballCompareTeams}?team1=${team1}&team2=${team2}&season=${season}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Comparison failed');
      }
      
      const data = await response.json();
      setLoading(false);
      return data;
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  /**
   * Analyze a game situation
   */
  const analyzeSituation = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams({
        down: params.down,
        distance: params.distance,
        yardline: params.yardline || 50,
        score_diff: params.scoreDiff || 0,
        quarter: params.quarter || 2,
        season: params.season || 2025,
      });
      
      if (params.defendersInBox) {
        queryParams.append('defenders_in_box', params.defendersInBox);
      }
      
      const url = `${ENDPOINTS.footballSituation}?${queryParams}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Analysis failed');
      }
      
      const data = await response.json();
      setLoading(false);
      return data;
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  /**
   * Check API health
   */
  const checkHealth = useCallback(async () => {
    try {
      const response = await fetch(ENDPOINTS.footballHealth);
      return await response.json();
    } catch (err) {
      return { status: 'error', error: err.message };
    }
  }, []);

  /**
   * Check rate limit status
   */
  const checkRateLimit = useCallback(async () => {
    try {
      const url = `${ENDPOINTS.footballRateLimit}?session_id=${sessionId}`;
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      return { error: err.message };
    }
  }, [sessionId]);

  /**
   * Get list of all teams
   */
  const getTeams = useCallback(async () => {
    try {
      const response = await fetch(ENDPOINTS.footballTeams);
      return await response.json();
    } catch (err) {
      return { teams: {} };
    }
  }, []);

  return {
    // State
    loading,
    error,
    sessionId,
    
    // Methods
    sendMessage,
    getTeamProfile,
    compareTeams,
    analyzeSituation,
    checkHealth,
    checkRateLimit,
    getTeams,
    
    // Config (for debugging)
    apiUrl: API_CONFIG.baseUrl,
  };
}

export default useApi;
