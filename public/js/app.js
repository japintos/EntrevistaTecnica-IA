const API_BASE = '/api';

async function apiFetch(url, options = {}) {
  const res = await fetch(url, options);
  const contentType = res.headers.get('content-type') || '';
  const text = await res.text();
  if (!contentType.includes('application/json')) {
    throw new Error(
      'El servidor no respondió correctamente. Asegúrate de ejecutar "npm start" y abrir http://localhost:3000'
    );
  }
  try {
    return { data: JSON.parse(text), res };
  } catch {
    throw new Error(
      'Error de conexión. Verifica que el servidor esté corriendo con "npm start"'
    );
  }
}

const TEXTS = {
  es: {
    startInterview: 'Comenzar entrevista',
    yourAnswer: 'Tu respuesta',
    write: 'Escribir',
    voice: 'Voz',
    placeholder: 'Escribe tu respuesta aquí...',
    submit: 'Enviar respuesta',
    nextQuestion: 'Siguiente pregunta',
    viewResults: 'Ver evaluación',
    correct: 'Correcta',
    incomplete: 'Incompleta',
    incorrect: 'Incorrecta',
    explanation: 'Explicación',
    suggestions: 'Sugerencias',
    history: 'Historial',
    restart: 'Reiniciar',
    export: 'Exportar historial',
    questionLabel: 'Pregunta del entrevistador',
    questionCount: 'Cantidad de preguntas',
    loading: 'Cargando...',
    resultsTitle: 'Evaluación de la entrevista',
    newInterview: 'Nueva entrevista',
    exportResults: 'Exportar resultados',
    correctCount: 'Correctas',
    incompleteCount: 'Incompletas',
    incorrectCount: 'Incorrectas',
    scoreExcellent: '¡Excelente! Dominas los conceptos. Sigue practicando para mantener el nivel.',
    scoreGood: 'Muy bien. Tienes buena base, revisa los temas marcados como incompletos.',
    scoreFair: 'Hay margen de mejora. Repasa los conceptos y vuelve a intentarlo.',
    scoreLow: 'Necesitas repasar los fundamentos. La práctica te ayudará a mejorar.'
  },
  en: {
    startInterview: 'Start interview',
    yourAnswer: 'Your answer',
    write: 'Write',
    voice: 'Voice',
    placeholder: 'Write your answer here...',
    submit: 'Submit answer',
    nextQuestion: 'Next question',
    viewResults: 'View evaluation',
    correct: 'Correct',
    incomplete: 'Incomplete',
    incorrect: 'Incorrect',
    explanation: 'Explanation',
    suggestions: 'Suggestions',
    history: 'History',
    restart: 'Restart',
    export: 'Export history',
    questionLabel: 'Interviewer question',
    questionCount: 'Number of questions',
    loading: 'Loading...',
    resultsTitle: 'Interview evaluation',
    newInterview: 'New interview',
    exportResults: 'Export results',
    correctCount: 'Correct',
    incompleteCount: 'Incomplete',
    incorrectCount: 'Incorrect',
    scoreExcellent: 'Excellent! You master the concepts. Keep practicing to maintain your level.',
    scoreGood: 'Very good. You have a solid foundation, review the incomplete topics.',
    scoreFair: 'Room for improvement. Review the concepts and try again.',
    scoreLow: 'You need to review the fundamentals. Practice will help you improve.'
  }
};

const MANUAL_TEXTS = {
  es: {
    manualTitle: 'Manual de uso',
    intro: 'Esta aplicación está pensada para uso local. Cada usuario debe configurar sus propias API keys de IA. Una vez configuradas, el proyecto se encarga del resto.',
    localTitle: 'Uso local',
    localText: 'La app se ejecuta en tu máquina (localhost). No hay servidor central: tú controlas tus datos y tus credenciales. Ejecuta "npm start" y abre http://localhost:3000.',
    keysTitle: 'Configuración de API keys (personal)',
    keysText: 'Las llamadas a las APIs de IA tienen costo. Cada usuario configura sus credenciales en el archivo .env (no se sube al repo). Opciones:',
    'keys-groq': 'Gratis, tier generoso. Obtén tu key en',
    'keys-ollama': 'Gratis, corre local. Instala Ollama y ejecuta ollama run llama3.2',
    'keys-paid': 'Tienen costo. Obtén keys en las consolas de cada proveedor.',
    usageTitle: 'Cómo usar',
    step1: 'Configura tu .env con una API key (ver sección anterior).',
    step2: 'Ejecuta npm start y abre http://localhost:3000',
    step3: 'Elige idioma, nivel (Junior/Ssr/Senior) y cantidad de preguntas.',
    step4: 'Responde cada pregunta por texto o voz. La IA evalúa y da feedback.',
    step5: 'Al final verás tu puntuación y desglose (correctas, incompletas, incorrectas).',
    step6: 'Exporta el informe en PDF con todos los detalles.',
    featuresTitle: 'Funcionalidades',
    featuresList: '<li>Preguntas adaptadas a tu nivel</li><li>Feedback con explicación y sugerencias</li><li>Exportación a PDF detallado</li><li>Modo texto y voz</li><li>Historial de la sesión</li><li>Evaluación final con puntuación</li>',
    creditsTitle: 'Créditos',
    creditsText: 'Desarrollado por Julio Pintos. Powered by WebXpert y Groq (IA).'
  },
  en: {
    manualTitle: 'User manual',
    intro: 'This application is designed for local use. Each user must configure their own AI API keys. Once configured, the project handles the rest.',
    localTitle: 'Local use',
    localText: 'The app runs on your machine (localhost). There is no central server: you control your data and credentials. Run "npm start" and open http://localhost:3000.',
    keysTitle: 'API keys configuration (personal)',
    keysText: 'AI API calls have a cost. Each user configures their credentials in the .env file (not committed to the repo). Options:',
    'keys-groq': 'Free, generous tier. Get your key at',
    'keys-ollama': 'Free, runs locally. Install Ollama and run ollama run llama3.2',
    'keys-paid': 'Paid. Get keys from each provider\'s console.',
    usageTitle: 'How to use',
    step1: 'Configure your .env with an API key (see previous section).',
    step2: 'Run npm start and open http://localhost:3000',
    step3: 'Choose language, level (Junior/Ssr/Senior) and number of questions.',
    step4: 'Answer each question by text or voice. The AI evaluates and gives feedback.',
    step5: 'At the end you\'ll see your score and breakdown (correct, incomplete, incorrect).',
    step6: 'Export the detailed report as PDF.',
    featuresTitle: 'Features',
    featuresList: '<li>Questions adapted to your level</li><li>Feedback with explanation and suggestions</li><li>Detailed PDF export</li><li>Text and voice mode</li><li>Session history</li><li>Final evaluation with score</li>',
    creditsTitle: 'Credits',
    creditsText: 'Developed by Julio Pintos. Powered by WebXpert and Groq (AI).'
  }
};

const SCORE_MAP = { correct: 10, incomplete: 6, incorrect: 1 };

let state = {
  sessionId: null,
  config: { language: 'es', level: 'ssr', questionCount: 10 },
  currentQuestion: '',
  mode: 'text',
  history: [],
  isSubmitting: false,
  pendingNextQuestion: null,
  interviewEnded: false
};

const DOM = {
  configScreen: document.getElementById('configScreen'),
  configForm: document.getElementById('configForm'),
  interviewScreen: document.getElementById('interviewScreen'),
  questionContent: document.getElementById('questionContent'),
  questionText: document.getElementById('questionText'),
  questionLoading: document.getElementById('questionLoading'),
  questionProgress: document.getElementById('questionProgress'),
  answerInput: document.getElementById('answerInput'),
  submitBtn: document.getElementById('submitBtn'),
  voiceBtn: document.getElementById('voiceBtn'),
  feedbackArea: document.getElementById('feedbackArea'),
  feedbackBadge: document.getElementById('feedbackBadge'),
  feedbackExplanation: document.getElementById('feedbackExplanation'),
  feedbackSuggestions: document.getElementById('feedbackSuggestions'),
  nextQuestionBtn: document.getElementById('nextQuestionBtn'),
  resultsScreen: document.getElementById('resultsScreen'),
  scoreValue: document.getElementById('scoreValue'),
  scoreCircle: document.getElementById('scoreCircle'),
  scoreBreakdown: document.getElementById('scoreBreakdown'),
  scoreMessage: document.getElementById('scoreMessage'),
  newInterviewBtn: document.getElementById('newInterviewBtn'),
  exportResultsBtn: document.getElementById('exportResultsBtn'),
  historyPanel: document.getElementById('historyPanel'),
  historyList: document.getElementById('historyList'),
  menuBtn: document.getElementById('menuBtn'),
  closeHistoryBtn: document.getElementById('closeHistoryBtn'),
  exportBtn: document.getElementById('exportBtn'),
  restartBtn: document.getElementById('restartBtn'),
  overlay: document.getElementById('overlay'),
  sessionBadge: document.getElementById('sessionBadge'),
  manualModal: document.getElementById('manualModal'),
  closeManualBtn: document.getElementById('closeManualBtn'),
  manualBtnConfig: document.getElementById('manualBtnConfig'),
  manualBtnHeader: document.getElementById('manualBtnHeader')
};

function t(key) {
  return TEXTS[state.config.language]?.[key] || TEXTS.es[key];
}

function updateUI() {
  document.querySelector('[for="answerInput"]').textContent = t('yourAnswer');
  document.getElementById('answerInput').placeholder = t('placeholder');
  document.getElementById('submitBtn').textContent = t('submit');
  document.querySelector('.question-label').textContent = t('questionLabel');
  const qcLabel = document.querySelector('[for="questionCount"]');
  if (qcLabel) qcLabel.textContent = t('questionCount');
  document.getElementById('restartBtn').textContent = t('restart');
  document.querySelector('.panel-header h3').textContent = t('history');
  DOM.nextQuestionBtn.textContent = t('nextQuestion') + ' →';
  DOM.newInterviewBtn.textContent = t('newInterview');
  DOM.exportResultsBtn.textContent = t('exportResults');
}

function showConfig() {
  DOM.configScreen.classList.remove('hidden');
  DOM.interviewScreen.classList.add('hidden');
  DOM.resultsScreen.classList.add('hidden');
}

function showInterview() {
  DOM.configScreen.classList.add('hidden');
  DOM.interviewScreen.classList.remove('hidden');
  DOM.resultsScreen.classList.add('hidden');
}

function showResults() {
  DOM.resultsScreen.classList.remove('hidden');
  DOM.feedbackArea.classList.add('hidden');
  document.querySelector('.question-area').classList.add('hidden');
  document.querySelector('.response-area').classList.add('hidden');
}

function hideResults() {
  DOM.resultsScreen.classList.add('hidden');
  document.querySelector('.question-area').classList.remove('hidden');
  document.querySelector('.response-area').classList.remove('hidden');
}

async function startInterview() {
  const language = document.getElementById('language').value;
  const level = document.getElementById('level').value;
  const questionCount = parseInt(document.getElementById('questionCount').value, 10);

  try {
    const { data, res } = await apiFetch(`${API_BASE}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, level, questionCount })
    });
    if (!res.ok) throw new Error(data.error || 'Error al iniciar');

    state.sessionId = data.sessionId;
    state.config = data.config;
    state.currentQuestion = data.question;
    state.history = [];
    state.pendingNextQuestion = null;
    state.interviewEnded = false;

    updateUI();
    showInterview();
    hideResults();
    setQuestion(data.question);
    updateSessionBadge();
    updateProgress();
    DOM.answerInput.disabled = false;
    DOM.submitBtn.disabled = false;
    DOM.voiceBtn.disabled = false;
    DOM.feedbackArea.classList.add('hidden');
  } catch (err) {
    alert(err.message || 'Error al iniciar la entrevista. Verifica la configuración de la API.');
  }
}

function setQuestion(text) {
  DOM.questionLoading.classList.add('hidden');
  DOM.questionText.textContent = text;
  DOM.questionText.classList.remove('hidden');
}

function showLoadingQuestion() {
  DOM.questionText.classList.add('hidden');
  DOM.questionLoading.classList.remove('hidden');
}

function updateSessionBadge() {
  const levelLabels = { junior: 'Junior', ssr: 'Ssr', senior: 'Senior' };
  const langLabels = { es: 'Español', en: 'English' };
  DOM.sessionBadge.textContent = `${levelLabels[state.config.level]} · ${langLabels[state.config.language]} · ${state.config.questionCount} preguntas`;
}

function updateProgress() {
  const current = state.history.length + 1;
  const total = state.config.questionCount;
  DOM.questionProgress.textContent = `${current} / ${total}`;
}

async function submitAnswer() {
  const answer = DOM.answerInput.value.trim();
  if (!answer || state.isSubmitting) return;

  state.isSubmitting = true;
  DOM.submitBtn.disabled = true;
  DOM.answerInput.disabled = true;
  DOM.feedbackArea.classList.add('hidden');

  try {
    const { data, res } = await apiFetch(`${API_BASE}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: state.sessionId,
        answer,
        currentQuestion: state.currentQuestion
      })
    });
    if (!res.ok) throw new Error(data.error || 'Error al evaluar');

    state.history.push({
      question: state.currentQuestion,
      userAnswer: answer,
      feedback: data.feedback,
      nextQuestion: data.nextQuestion
    });

    state.pendingNextQuestion = data.nextQuestion;
    state.interviewEnded = data.interviewEnded || false;

    if (data.feedback) {
      showFeedback(data.feedback);
      DOM.nextQuestionBtn.classList.remove('hidden');
      if (state.interviewEnded) {
        DOM.nextQuestionBtn.textContent = t('viewResults') + ' →';
      } else {
        DOM.nextQuestionBtn.textContent = t('nextQuestion') + ' →';
      }
    }

    DOM.answerInput.value = '';
    renderHistory();
  } catch (err) {
    alert(err.message || 'Error al enviar la respuesta.');
  } finally {
    state.isSubmitting = false;
    DOM.submitBtn.disabled = false;
    DOM.answerInput.disabled = false;
  }
}

function showFeedback(feedback) {
  DOM.feedbackBadge.textContent = t(feedback.evaluation);
  DOM.feedbackBadge.className = `feedback-badge ${feedback.evaluation}`;
  DOM.feedbackExplanation.textContent = feedback.explanation || '-';
  DOM.feedbackSuggestions.textContent = feedback.suggestions || '-';
  DOM.feedbackArea.classList.remove('hidden');
  DOM.feedbackArea.scrollIntoView({ behavior: 'smooth' });
}

function goToNextQuestion() {
  if (state.interviewEnded) {
    showFinalResults();
    return;
  }
  if (!state.pendingNextQuestion) return;

  state.currentQuestion = state.pendingNextQuestion;
  state.pendingNextQuestion = null;
  DOM.feedbackArea.classList.add('hidden');
  setQuestion(state.currentQuestion);
  updateProgress();
  DOM.answerInput.disabled = false;
  DOM.submitBtn.disabled = false;
  document.querySelector('.question-area')?.scrollIntoView({ behavior: 'smooth' });
}

function showFinalResults() {
  const counts = { correct: 0, incomplete: 0, incorrect: 0 };
  state.history.forEach(h => {
    const evalType = h.feedback?.evaluation || 'incomplete';
    counts[evalType]++;
  });

  const total = state.history.length;
  const totalScore = state.history.reduce((sum, h) => {
    const evalType = h.feedback?.evaluation || 'incomplete';
    return sum + (SCORE_MAP[evalType] || 6);
  }, 0);
  const avgScore = total > 0 ? Math.round((totalScore / total) * 10) / 10 : 0;

  DOM.scoreValue.textContent = avgScore.toFixed(1);
  DOM.scoreBreakdown.innerHTML = `
    <span class="breakdown-item correct">${counts.correct} ${t('correctCount')}</span>
    <span class="breakdown-item incomplete">${counts.incomplete} ${t('incompleteCount')}</span>
    <span class="breakdown-item incorrect">${counts.incorrect} ${t('incorrectCount')}</span>
  `;

  let messageKey = 'scoreLow';
  if (avgScore >= 8.5) messageKey = 'scoreExcellent';
  else if (avgScore >= 7) messageKey = 'scoreGood';
  else if (avgScore >= 5) messageKey = 'scoreFair';
  DOM.scoreMessage.textContent = t(messageKey);

  DOM.scoreCircle.className = 'score-circle ' + (avgScore >= 7 ? 'score-high' : avgScore >= 5 ? 'score-mid' : 'score-low');
  document.querySelector('.results-card h2').textContent = t('resultsTitle');
  showResults();
}

function renderHistory() {
  const items = state.history;
  DOM.historyList.innerHTML = items.map((item, i) => {
    const evalClass = item.feedback?.evaluation || 'incomplete';
    return `
      <div class="history-item" data-index="${i}">
        <div class="question-preview">${escapeHtml(item.question)}</div>
        <div class="answer-preview">${escapeHtml(item.userAnswer)}</div>
        ${item.feedback ? `<span class="eval-badge ${evalClass}">${t(item.feedback.evaluation)}</span>` : ''}
      </div>
    `;
  }).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function toggleHistoryPanel() {
  DOM.historyPanel.classList.toggle('open');
  DOM.overlay.classList.toggle('visible');
}

function getManualLanguage() {
  const langSelect = document.getElementById('language');
  return (langSelect && langSelect.value) || state.config.language || 'es';
}

function populateManualContent() {
  const lang = getManualLanguage();
  const texts = MANUAL_TEXTS[lang] || MANUAL_TEXTS.es;

  document.querySelector('.manual-header h2').textContent = texts.manualTitle;
  document.querySelector('.manual-intro-text').textContent = texts.intro;

  document.querySelector('[data-section="local"] .manual-section-title').textContent = texts.localTitle;
  document.querySelector('[data-section="local"] [data-lang="local-text"]').textContent = texts.localText;

  document.querySelector('[data-section="keys"] .manual-section-title').textContent = texts.keysTitle;
  document.querySelector('[data-section="keys"] [data-lang="keys-text"]').textContent = texts.keysText;
  document.querySelectorAll('[data-lang="keys-groq"]').forEach(el => { el.textContent = texts['keys-groq']; });
  document.querySelectorAll('[data-lang="keys-ollama"]').forEach(el => { el.textContent = texts['keys-ollama']; });
  document.querySelectorAll('[data-lang="keys-paid"]').forEach(el => { el.textContent = texts['keys-paid']; });

  document.querySelector('[data-section="usage"] .manual-section-title').textContent = texts.usageTitle;
  document.querySelector('[data-section="usage"] [data-lang="step1"]').textContent = texts.step1;
  document.querySelector('[data-section="usage"] [data-lang="step2"]').textContent = texts.step2;
  document.querySelector('[data-section="usage"] [data-lang="step3"]').textContent = texts.step3;
  document.querySelector('[data-section="usage"] [data-lang="step4"]').textContent = texts.step4;
  document.querySelector('[data-section="usage"] [data-lang="step5"]').textContent = texts.step5;
  document.querySelector('[data-section="usage"] [data-lang="step6"]').textContent = texts.step6;

  document.querySelector('[data-section="features"] .manual-section-title').textContent = texts.featuresTitle;
  const featuresEl = document.querySelector('[data-section="features"] [data-lang="features-list"]');
  if (featuresEl) featuresEl.innerHTML = texts.featuresList;

  document.querySelector('[data-section="credits"] .manual-section-title').textContent = texts.creditsTitle;
  document.querySelector('[data-section="credits"] [data-lang="credits-text"]').textContent = texts.creditsText;
}

function openManual() {
  populateManualContent();
  DOM.manualModal.classList.add('open');
  document.querySelectorAll('.manual-section').forEach(s => s.classList.remove('open'));
  document.querySelector('.manual-section').classList.add('open');
}

function closeManual() {
  DOM.manualModal.classList.remove('open');
}

function toggleManualSection(sectionEl) {
  sectionEl.classList.toggle('open');
}

async function exportHistory() {
  if (!state.sessionId) return;
  try {
    const { data, res } = await apiFetch(`${API_BASE}/export/${state.sessionId}`);
    if (!res.ok) throw new Error(data.error);

    if (state.history.length > 0) {
      const total = state.history.length;
      const totalScore = state.history.reduce((sum, h) => {
        const evalType = h.feedback?.evaluation || 'incomplete';
        return sum + (SCORE_MAP[evalType] || 6);
      }, 0);
      data.evaluation = {
        score: Math.round((totalScore / total) * 10) / 10,
        scale: '1-10',
        totalQuestions: total
      };
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `entrevista-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    alert(err.message || 'Error al exportar');
  }
}

async function exportToPdf() {
  if (!state.sessionId) return;
  try {
    const { data, res } = await apiFetch(`${API_BASE}/export/${state.sessionId}`);
    if (!res.ok) throw new Error(data.error);

    const total = state.history.length;
    const counts = { correct: 0, incomplete: 0, incorrect: 0 };
    state.history.forEach(h => {
      const evalType = h.feedback?.evaluation || 'incomplete';
      counts[evalType]++;
    });
    const totalScore = state.history.reduce((sum, h) => {
      const evalType = h.feedback?.evaluation || 'incomplete';
      return sum + (SCORE_MAP[evalType] || 6);
    }, 0);
    const avgScore = total > 0 ? Math.round((totalScore / total) * 10) / 10 : 0;

    const levelLabels = { junior: 'Junior', ssr: 'Semi Senior (Ssr)', senior: 'Senior' };
    const langLabels = { es: 'Español', en: 'English' };
    const evalLabels = { correct: t('correct'), incomplete: t('incomplete'), incorrect: t('incorrect') };

    const baseUrl = window.location.origin;
    const webexpertLogo = `${baseUrl}/img/webExpert%20lab%201.jpg`;
    const groqLogo = `${baseUrl}/img/grok.png`;

    const qaItems = state.history.map((item, i) => {
      const evalType = item.feedback?.evaluation || 'incomplete';
      const evalClass = evalType === 'correct' ? '#22c55e' : evalType === 'incomplete' ? '#eab308' : '#ef4444';
      return `
        <div class="pdf-qa" style="margin-bottom: 24px; padding: 16px; background: #f8fafc; border-radius: 12px; border-left: 4px solid ${evalClass};">
          <div style="font-size: 11px; color: #64748b; margin-bottom: 6px; font-weight: 600;">Pregunta ${i + 1} · ${evalLabels[evalType]}</div>
          <div style="font-size: 13px; color: #1e293b; font-weight: 600; margin-bottom: 8px;">${escapeHtml(item.question)}</div>
          <div style="font-size: 12px; color: #475569; margin-bottom: 10px;"><strong>Tu respuesta:</strong> ${escapeHtml(item.userAnswer)}</div>
          ${item.feedback ? `
            <div style="font-size: 11px; color: #334155; margin-bottom: 4px;"><strong>Explicación:</strong> ${escapeHtml(item.feedback.explanation || '-')}</div>
            <div style="font-size: 11px; color: #334155;"><strong>Sugerencias:</strong> ${escapeHtml(item.feedback.suggestions || '-')}</div>
          ` : ''}
        </div>
      `;
    }).join('');

    const html = `
      <div id="pdf-content" style="font-family: 'Segoe UI', system-ui, sans-serif; padding: 32px; color: #1e293b; max-width: 800px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #22c55e;">
          <img src="${webexpertLogo}" alt="WebXpert" style="height: 48px; object-fit: contain;">
          <img src="${groqLogo}" alt="Groq" style="height: 36px; object-fit: contain;">
        </div>

        <h1 style="font-size: 28px; color: #0f172a; margin-bottom: 8px;">Informe de Entrevista Técnica</h1>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 28px;">Generado el ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>

        <div style="display: flex; gap: 24px; margin-bottom: 28px; flex-wrap: wrap;">
          <div style="padding: 16px 20px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 16px; color: white; text-align: center; min-width: 140px;">
            <div style="font-size: 12px; opacity: 0.9; margin-bottom: 4px;">Puntuación</div>
            <div style="font-size: 36px; font-weight: 700;">${avgScore.toFixed(1)}<span style="font-size: 18px; font-weight: 400;">/10</span></div>
          </div>
          <div style="padding: 16px 20px; background: #f1f5f9; border-radius: 16px; flex: 1;">
            <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">Desglose</div>
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              <span style="font-size: 13px; color: #22c55e;"><strong>${counts.correct}</strong> ${t('correctCount')}</span>
              <span style="font-size: 13px; color: #eab308;"><strong>${counts.incomplete}</strong> ${t('incompleteCount')}</span>
              <span style="font-size: 13px; color: #ef4444;"><strong>${counts.incorrect}</strong> ${t('incorrectCount')}</span>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 24px; padding: 16px; background: #f8fafc; border-radius: 12px;">
          <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">Configuración de la sesión</div>
          <div style="font-size: 13px; color: #334155;">
            <strong>Idioma:</strong> ${langLabels[data.config?.language] || 'Español'} · 
            <strong>Nivel:</strong> ${levelLabels[data.config?.level] || 'Ssr'} · 
            <strong>Preguntas:</strong> ${total}
          </div>
        </div>

        <h2 style="font-size: 18px; color: #0f172a; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">Detalle de preguntas y respuestas</h2>
        ${qaItems || '<p style="color: #64748b;">No hay preguntas en esta sesión.</p>'}

        <div style="margin-top: 40px; padding-top: 24px; border-top: 2px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div style="font-size: 12px; color: #64748b;">
            Desarrollado por <strong style="color: #22c55e;">Julio Pintos</strong>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${webexpertLogo}" alt="WebXpert" style="height: 32px; object-fit: contain;">
            <img src="${groqLogo}" alt="Groq" style="height: 24px; object-fit: contain;">
          </div>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.style.cssText = 'position:absolute;left:-9999px;top:0;width:800px;';
    container.innerHTML = html;
    document.body.appendChild(container);

    const opt = {
      margin: 12,
      filename: `entrevista-tecnica-${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().set(opt).from(container).save();
    document.body.removeChild(container);
  } catch (err) {
    alert(err.message || 'Error al exportar PDF');
  }
}

function restart() {
  if (state.sessionId) {
    fetch(`${API_BASE}/restart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: state.sessionId })
    });
  }
  state = {
    sessionId: null,
    config: { language: 'es', level: 'ssr', questionCount: 10 },
    currentQuestion: '',
    mode: 'text',
    history: [],
    isSubmitting: false,
    pendingNextQuestion: null,
    interviewEnded: false
  };
  showConfig();
}

// Voice input
let recognition = null;

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = state.config.language === 'es' ? 'es-ES' : 'en-US';

  recognition.onresult = (e) => {
    const transcript = Array.from(e.results)
      .filter(r => r.isFinal)
      .map(r => r[0].transcript)
      .join('');
    if (transcript) {
      DOM.answerInput.value = (DOM.answerInput.value + ' ' + transcript).trim();
    }
  };

  recognition.onerror = () => {
    DOM.voiceBtn.classList.remove('recording');
    recognition.stop();
  };
}

function toggleVoice() {
  if (!recognition) {
    initSpeechRecognition();
    if (!recognition) {
      alert('Tu navegador no soporta reconocimiento de voz.');
      return;
    }
  }

  if (DOM.voiceBtn.classList.contains('recording')) {
    recognition.stop();
    DOM.voiceBtn.classList.remove('recording');
  } else {
    recognition.lang = state.config.language === 'es' ? 'es-ES' : 'en-US';
    recognition.start();
    DOM.voiceBtn.classList.add('recording');
  }
}

// Mode toggle
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.mode = btn.dataset.mode;
    DOM.voiceBtn.style.display = state.mode === 'voice' ? 'flex' : 'none';
    if (state.mode === 'text' && DOM.voiceBtn.classList.contains('recording') && recognition) {
      recognition.stop();
      DOM.voiceBtn.classList.remove('recording');
    }
  });
});

document.querySelector('[data-mode="text"]').click();

// Event listeners
DOM.configForm.addEventListener('submit', (e) => {
  e.preventDefault();
  startInterview();
});

DOM.submitBtn.addEventListener('click', submitAnswer);

DOM.answerInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    submitAnswer();
  }
});

DOM.voiceBtn.addEventListener('click', toggleVoice);

DOM.menuBtn.addEventListener('click', toggleHistoryPanel);
DOM.closeHistoryBtn.addEventListener('click', toggleHistoryPanel);
DOM.overlay.addEventListener('click', toggleHistoryPanel);

DOM.exportBtn.addEventListener('click', exportToPdf);
DOM.restartBtn.addEventListener('click', restart);
DOM.nextQuestionBtn.addEventListener('click', goToNextQuestion);
DOM.newInterviewBtn.addEventListener('click', restart);
DOM.exportResultsBtn.addEventListener('click', exportToPdf);

DOM.manualBtnConfig?.addEventListener('click', openManual);
DOM.manualBtnHeader?.addEventListener('click', openManual);
DOM.closeManualBtn?.addEventListener('click', closeManual);
document.getElementById('manualBackdrop')?.addEventListener('click', closeManual);
document.querySelectorAll('.manual-section-btn').forEach(btn => {
  btn.addEventListener('click', () => toggleManualSection(btn.closest('.manual-section')));
});
