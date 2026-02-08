/**
 * Football Analytics API Hooks
 * 
 * Handles all communication with the football analytics backend.
 * Supports both standalone and merged API deployments.
 */

import { useState, useCallback } from 'react';

// =============================================================================
// Configuration
// =============================================================================

// API Base URL - configurable via environment variable
// Default: localhost for development
// For production: set VITE_API_URL in .env
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Football endpoints are prefixed with /football
const FOOTBALL_PREFIX = '/football';

// Helper to build full URLs
const footballUrl = (path) => `${API_BASE}${FOOTBALL_PREFIX}${path}`;

// =============================================================================
// useApi - Generic API hook
// =============================================================================

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
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

  return { request, loading, error };
}

// =============================================================================
// useChat - Chat conversation hook
// =============================================================================

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId] = useState(() => {
    // Try to restore session ID from storage for continuity
    const stored = sessionStorage.getItem('football-session-id');
    if (stored) return stored;
    const newId = `session-${Date.now()}`;
    sessionStorage.setItem('football-session-id', newId);
    return newId;
  });

  const sendMessage = useCallback(async (content, context = {}) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(footballUrl('/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          session_id: sessionId,
          context,
          use_llm: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Chat error: ${response.status}`);
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.text,
        timestamp: new Date(),
        pipeline: data.pipeline,
        confidence: data.confidence,
        tier: data.tier,
        data: data.data,
        usedLlm: data.used_llm,
        suggestions: data.suggestions,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Sorry, I encountered an error: ${err.message}. Please try again.`,
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
      
      throw err;
    }
  }, [sessionId]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    sendMessage,
    clearMessages,
    loading,
    error,
    sessionId,
  };
}

// =============================================================================
// useHealth - Health check hook
// =============================================================================

export function useHealth() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkHealth = useCallback(async () => {
    try {
      const response = await fetch(footballUrl('/health'));
      const data = await response.json();
      setHealth(data);
      setLoading(false);
      return data;
    } catch (err) {
      setHealth({ status: 'error', error: err.message });
      setLoading(false);
      return null;
    }
  }, []);

  return { health, checkHealth, loading };
}

// =============================================================================
// useTeamProfile - Team profile hook
// =============================================================================

export function useTeamProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProfile = useCallback(async (team, season = 2025) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(footballUrl(`/teams/${team}/profile?season=${season}`));
      
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

  return { getProfile, loading, error };
}

// =============================================================================
// useRateLimit - Rate limit status hook
// =============================================================================

export function useRateLimit() {
  const [rateLimit, setRateLimit] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkRateLimit = useCallback(async (sessionId) => {
    setLoading(true);
    try {
      const url = sessionId 
        ? footballUrl(`/rate-limit/status?session_id=${sessionId}`)
        : footballUrl('/rate-limit/status');
      const response = await fetch(url);
      const data = await response.json();
      setRateLimit(data);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      return { error: err.message };
    }
  }, []);

  return { rateLimit, checkRateLimit, loading };
}

// =============================================================================
// Export configuration for debugging
// =============================================================================

export const API_CONFIG = {
  baseUrl: API_BASE,
  footballPrefix: FOOTBALL_PREFIX,
  fullUrl: (path) => footballUrl(path),
};

export default useApi;