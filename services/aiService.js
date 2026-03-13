import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import 'dotenv/config';

const AI_PROVIDER = process.env.AI_PROVIDER || 'groq';

const getSystemPrompt = (language, level) => {
  const lang = language === 'es' ? 'español' : 'inglés';
  const levelInstructions = {
    junior: language === 'es' 
      ? 'Haz preguntas básicas sobre HTML, CSS y Node.js. Conceptos fundamentales, sintaxis básica, elementos esenciales.'
      : 'Ask basic questions about HTML, CSS and Node.js. Fundamental concepts, basic syntax, essential elements.',
    ssr: language === 'es'
      ? 'Haz preguntas intermedias: escenarios prácticos, optimización, buenas prácticas, patrones de diseño básicos.'
      : 'Ask intermediate questions: practical scenarios, optimization, best practices, basic design patterns.',
    senior: language === 'es'
      ? 'Haz preguntas avanzadas sobre arquitectura, escalabilidad, patrones avanzados, liderazgo técnico y toma de decisiones.'
      : 'Ask advanced questions about architecture, scalability, advanced patterns, technical leadership and decision making.'
  };

  return `Eres un entrevistador técnico experto. Conduces la entrevista en ${lang}.

NIVEL: ${level.toUpperCase()} - ${levelInstructions[level]}

REGLAS ESTRICTAS:
1. Haz UNA sola pregunta a la vez.
2. Las preguntas deben ser sobre desarrollo web: HTML, CSS, JavaScript, Node.js, y temas relacionados al nivel indicado.
3. Cuando el usuario responda, debes dar feedback INMEDIATO en este formato JSON exacto:
{
  "evaluation": "correct" | "incomplete" | "incorrect",
  "explanation": "Explicación breve del concepto correcto (2-4 oraciones)",
  "suggestions": "Sugerencias concretas para mejorar la respuesta (1-3 puntos)",
  "nextQuestion": "La siguiente pregunta técnica (una sola pregunta)"
}

4. Si es la primera interacción, solo envía la primera pregunta como texto plano (sin JSON).
5. Responde SIEMPRE en el idioma seleccionado (${lang}).
6. Sé constructivo y motivador, estilo "entrenador personal" para entrevistas.`;
};

const parseAIResponse = (content, isFirstMessage) => {
  if (isFirstMessage) {
    return { question: content.trim(), feedback: null };
  }

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        question: parsed.nextQuestion || null,
        feedback: {
          evaluation: parsed.evaluation || 'incomplete',
          explanation: parsed.explanation || '',
          suggestions: parsed.suggestions || ''
        }
      };
    }
  } catch (e) {
    console.error('Error parsing AI response:', e.message);
  }

  return { question: content.trim(), feedback: null };
};

export async function getInitialQuestion(language, level) {
  const systemPrompt = getSystemPrompt(language, level);
  const firstPrompt = language === 'es'
    ? 'Comienza la entrevista técnica. Haz la primera pregunta.'
    : 'Start the technical interview. Ask the first question.';

  if (AI_PROVIDER === 'gemini') {
    return await getGeminiResponse(systemPrompt, firstPrompt, []);
  }
  if (AI_PROVIDER === 'groq') {
    return await getGroqResponse(systemPrompt, firstPrompt, []);
  }
  if (AI_PROVIDER === 'ollama') {
    return await getOllamaResponse(systemPrompt, firstPrompt, []);
  }
  return await getOpenAIResponse(systemPrompt, firstPrompt, []);
}

export async function evaluateAnswer(language, level, conversationHistory, userAnswer) {
  const systemPrompt = getSystemPrompt(language, level);

  if (AI_PROVIDER === 'gemini') {
    return await getGeminiResponse(systemPrompt, userAnswer, conversationHistory);
  }
  if (AI_PROVIDER === 'groq') {
    return await getGroqResponse(systemPrompt, userAnswer, conversationHistory);
  }
  if (AI_PROVIDER === 'ollama') {
    return await getOllamaResponse(systemPrompt, userAnswer, conversationHistory);
  }
  return await getOpenAIResponse(systemPrompt, userAnswer, conversationHistory);
}

async function getOpenAIResponse(systemPrompt, userMessage, history) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey || apiKey.startsWith('tu_api_key')) {
    throw new Error('OPENAI_API_KEY no configurada. Obtén una en https://platform.openai.com/api-keys y añádela en .env');
  }

  const openai = new OpenAI({ apiKey });

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.flatMap(h => [
      { role: 'user', content: h.userMessage },
      { role: 'assistant', content: h.assistantResponse }
    ]),
    { role: 'user', content: userMessage }
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    temperature: 0.7
  });

  const content = response.choices[0]?.message?.content || '';
  const isFirst = history.length === 0 && !content.includes('evaluation');
  return parseAIResponse(content, isFirst);
}

async function getGeminiResponse(systemPrompt, userMessage, history) {
  const apiKey = process.env.GOOGLE_AI_API_KEY?.trim();
  if (!apiKey || apiKey.startsWith('tu_api_key')) {
    throw new Error('GOOGLE_AI_API_KEY no configurada. Obtén una en https://aistudio.google.com/apikey y añádela en .env');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const fullPrompt = history.length === 0
    ? `${systemPrompt}\n\n${userMessage}`
    : `${systemPrompt}\n\nHistorial de la entrevista:\n${history.map(h => `Candidato respondió: ${h.userMessage}\nTu feedback fue: ${h.assistantResponse}`).join('\n\n')}\n\nAhora el candidato respondió:\n${userMessage}`;

  const result = await model.generateContent(fullPrompt);
  const response = result.response;
  const content = response.text() || '';

  const isFirst = history.length === 0 && !content.includes('evaluation');
  return parseAIResponse(content, isFirst);
}

async function getGroqResponse(systemPrompt, userMessage, history) {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey || apiKey.startsWith('tu_api_key')) {
    throw new Error('GROQ_API_KEY no configurada. Gratis en https://console.groq.com/keys');
  }

  const groq = new Groq({ apiKey });

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.flatMap(h => [
      { role: 'user', content: h.userMessage },
      { role: 'assistant', content: h.assistantResponse }
    ]),
    { role: 'user', content: userMessage }
  ];

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages,
    temperature: 0.7
  });

  const content = response.choices[0]?.message?.content || '';
  const isFirst = history.length === 0 && !content.includes('evaluation');
  return parseAIResponse(content, isFirst);
}

async function getOllamaResponse(systemPrompt, userMessage, history) {
  const baseUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'llama3.2';

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.flatMap(h => [
      { role: 'user', content: h.userMessage },
      { role: 'assistant', content: h.assistantResponse }
    ]),
    { role: 'user', content: userMessage }
  ];

  const res = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages, stream: false })
  });

  if (!res.ok) {
    throw new Error('Ollama no responde. Ejecuta "ollama run ' + model + '" en otra terminal.');
  }

  const data = await res.json();
  const content = data.message?.content || '';
  const isFirst = history.length === 0 && !content.includes('evaluation');
  return parseAIResponse(content, isFirst);
}
