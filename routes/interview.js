import { Router } from 'express';
import { getInitialQuestion, evaluateAnswer } from '../services/aiService.js';
import { createSession, getSession, addToHistory, getHistory, clearSession } from '../storage/historyStore.js';

function buildAssistantResponse(h) {
  if (!h.feedback) return '';
  return JSON.stringify({
    evaluation: h.feedback.evaluation,
    explanation: h.feedback.explanation,
    suggestions: h.feedback.suggestions,
    nextQuestion: h.nextQuestion
  });
}

const router = Router();

router.post('/start', async (req, res) => {
  try {
    const { language = 'es', level = 'ssr', questionCount = 10 } = req.body;
    const session = createSession({ language, level, questionCount });
    const { question } = await getInitialQuestion(language, level);

    res.json({
      sessionId: session.id,
      config: session.config,
      question
    });
  } catch (error) {
    console.error('Error starting interview:', error);
    const isAuthError = error.message?.includes('API key') || error.message?.includes('API_KEY') || error.status === 401;
    const message = isAuthError
      ? 'API key inválida o no configurada. Verifica GOOGLE_AI_API_KEY o OPENAI_API_KEY en el archivo .env'
      : (error.message || 'Error al iniciar la entrevista');
    res.status(500).json({ error: message });
  }
});

router.post('/answer', async (req, res) => {
  try {
    const { sessionId, answer, currentQuestion } = req.body;
    const session = getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Sesión no encontrada' });
    }

    const lastItem = session.history[session.history.length - 1];
    const question = currentQuestion || (lastItem ? lastItem.nextQuestion : null) || 'Pregunta';

    const conversationHistory = session.history.map(h => ({
      userMessage: `Pregunta: ${h.question}\nRespuesta del candidato: ${h.userAnswer}`,
      assistantResponse: h.assistantResponse || buildAssistantResponse(h)
    }));

    const result = await evaluateAnswer(
      session.config.language,
      session.config.level,
      conversationHistory,
      `Pregunta: ${question}\nRespuesta del candidato: ${answer}`
    );

    const assistantResponse = result.feedback
      ? JSON.stringify({
          evaluation: result.feedback.evaluation,
          explanation: result.feedback.explanation,
          suggestions: result.feedback.suggestions,
          nextQuestion: result.question
        })
      : result.question;

    const historyItem = {
      question,
      userAnswer: answer,
      feedback: result.feedback,
      nextQuestion: result.question,
      assistantResponse,
      timestamp: new Date().toISOString()
    };

    addToHistory(sessionId, historyItem);

    const interviewEnded = session.history.length >= session.config.questionCount;

    res.json({
      feedback: result.feedback,
      nextQuestion: interviewEnded ? null : result.question,
      interviewEnded,
      historyItem
    });
  } catch (error) {
    console.error('Error evaluating answer:', error);
    const isAuthError = error.message?.includes('API key') || error.message?.includes('API_KEY') || error.status === 401;
    const message = isAuthError
      ? 'API key inválida o no configurada. Verifica tu configuración en .env'
      : (error.message || 'Error al evaluar la respuesta');
    res.status(500).json({ error: message });
  }
});

router.get('/history/:sessionId', (req, res) => {
  const session = getSession(req.params.sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Sesión no encontrada' });
  }
  res.json({ history: session.history });
});

router.post('/restart', (req, res) => {
  const { sessionId } = req.body;
  if (sessionId) clearSession(sessionId);
  res.json({ ok: true });
});

router.post('/export/:sessionId', (req, res) => {
  const session = getSession(req.params.sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Sesión no encontrada' });
  }
  res.json({
    config: session.config,
    history: session.history,
    exportedAt: new Date().toISOString()
  });
});

export default router;
