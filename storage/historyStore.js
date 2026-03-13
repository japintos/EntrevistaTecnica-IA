const sessions = new Map();

export function createSession(config) {
  const id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const session = {
    id,
    config: { language: config.language, level: config.level, questionCount: config.questionCount || 10 },
    history: [],
    createdAt: new Date().toISOString()
  };
  sessions.set(id, session);
  return session;
}

export function getSession(id) {
  return sessions.get(id);
}

export function addToHistory(sessionId, item) {
  const session = sessions.get(sessionId);
  if (!session) return null;
  session.history.push(item);
  return session;
}

export function getHistory(sessionId) {
  const session = sessions.get(sessionId);
  return session ? session.history : [];
}

export function clearSession(sessionId) {
  sessions.delete(sessionId);
}
