# Entrevista Técnica IA

Aplicación web interactiva que emula una entrevista técnica con IA. La IA actúa como entrevistador, hace preguntas según el nivel elegido y da feedback inmediato tras cada respuesta.

## Requisitos

- Node.js 18+
- API Key de OpenAI (ChatGPT) o Google AI (Gemini)

## Instalación

```bash
# Clonar o navegar al proyecto
cd Entrevista_Tecnica-IA

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env y añadir tu API key
```

## Configuración de la API

Edita el archivo `.env`. Opciones (por defecto usa **Groq**, gratuito):

**Groq (gratis, recomendado):**
```
GROQ_API_KEY=tu_api_key
AI_PROVIDER=groq
```
Obtén la key en [console.groq.com/keys](https://console.groq.com/keys)

**Ollama (gratis, local):**
```
AI_PROVIDER=ollama
```
Instala [Ollama](https://ollama.com) y ejecuta `ollama run llama3.2`

**Google Gemini:**
```
GOOGLE_AI_API_KEY=tu_api_key
AI_PROVIDER=gemini
```

**OpenAI (ChatGPT):**
```
OPENAI_API_KEY=sk-...
AI_PROVIDER=openai
```

## Ejecución

```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

Para desarrollo con recarga automática:
```bash
npm run dev
```

## Ejemplo de flujo de uso

1. **Configuración inicial**
   - Usuario selecciona idioma = **Español**, nivel = **Ssr**
   - Clic en "Comenzar entrevista"

2. **Primera pregunta**
   - La IA pregunta: *"Explica qué es el event loop en Node.js."*

3. **Respuesta del usuario**
   - El usuario escribe o dicta su respuesta en el campo de texto

4. **Feedback inmediato**
   - La IA devuelve:
     - **Evaluación:** Correcta / Incompleta / Incorrecta
     - **Explicación:** Breve explicación del concepto correcto
     - **Sugerencias:** Cómo mejorar la respuesta
   - El usuario hace clic en **"Siguiente pregunta"** para continuar

5. **Evaluación final**
   - Al completar todas las preguntas (10, 15 o 20 según configuración), se muestra una evaluación con puntuación del 1 al 10 basada en el promedio de las respuestas

6. **Continuar**
   - El usuario puede revisar el historial, exportar la sesión o reiniciar con nueva configuración

## Estructura del proyecto

```
Entrevista_Tecnica-IA/
├── server.js           # Servidor Express
├── routes/
│   └── interview.js     # Rutas de la API
├── services/
│   └── aiService.js    # Integración OpenAI/Gemini
├── storage/
│   └── historyStore.js # Almacenamiento en memoria
├── public/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── .env.example
└── package.json
```

## Funcionalidades

- **Ciclo de preguntas:** Elige 10, 15 o 20 preguntas por entrevista
- **Idiomas:** Español e Inglés
- **Niveles:** Junior, Semi Senior (Ssr), Senior
- **Modos de entrada:** Texto y voz (Web Speech API)
- **Feedback:** Evaluación, explicación y sugerencias
- **Historial:** Revisión de preguntas y respuestas
- **Evaluación final:** Puntuación del 1 al 10 con desglose (correctas, incompletas, incorrectas)
- **Exportar:** Descarga del historial en JSON
- **Diseño:** Responsivo, animaciones suaves, tema oscuro
