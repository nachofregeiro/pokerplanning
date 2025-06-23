import { Session, User } from '../types';

const STORAGE_KEY = 'poker-planning-data';

export const saveSession = (session: Session): void => {
  const data = getStoredData();
  data.sessions[session.id] = session;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getSession = (sessionId: string): Session | null => {
  const data = getStoredData();
  return data.sessions[sessionId] || null;
};

export const saveCurrentUser = (user: User): void => {
  const data = getStoredData();
  data.currentUser = user;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getCurrentUser = (): User | null => {
  const data = getStoredData();
  return data.currentUser || null;
};

export const saveCurrentSession = (sessionId: string): void => {
  const data = getStoredData();
  data.currentSessionId = sessionId;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getCurrentSessionId = (): string | null => {
  const data = getStoredData();
  return data.currentSessionId || null;
};

export const clearCurrentSession = (): void => {
  const data = getStoredData();
  data.currentSessionId = null;
  data.currentUser = null;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const getStoredData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored data:', e);
    }
  }
  return {
    sessions: {},
    currentUser: null,
    currentSessionId: null
  };
};

export const generateSessionId = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const generateUserId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};