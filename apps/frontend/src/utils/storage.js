const SESSION_KEY = 'learn-and-earn-session';
const THEME_KEY = 'learn-and-earn-theme';

export function getStoredSession() {
  const raw = window.localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveStoredSession(session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

export function getStoredTheme() {
  return window.localStorage.getItem(THEME_KEY) || 'light';
}

export function saveStoredTheme(theme) {
  window.localStorage.setItem(THEME_KEY, theme);
}
