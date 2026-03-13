# Entrevista Técnica IA

Aplicación web interactiva que emula una entrevista técnica con IA. La IA actúa como entrevistador, hace preguntas según el nivel elegido y da feedback inmediato tras cada respuesta.

> **Uso local:** Esta aplicación está pensada para ejecutarse en tu entorno local. Cada desarrollador debe configurar sus propias API keys de IA, ya que su uso tiene un costo asociado y es personal. Una vez configuradas las credenciales, el proyecto se encarga del resto.

## Requisitos

- Node.js 18+
- API Key de IA (cada usuario configura la suya; ver opciones abajo)

## Instalación

```bash
# Clonar o navegar al proyecto
cd Entrevista_Tecnica-IA

# Instalar dependencias
npm install

# Configurar variables de entorno (OBLIGATORIO)
cp .env.example .env
# Editar .env y añadir TU API key
```

## Configuración de la API (personal)

**Importante:** Las llamadas a las APIs de IA tienen costo. Cada usuario debe configurar sus propias credenciales en el archivo `.env`. El archivo `.env` no se sube al repositorio por seguridad.

Edita el archivo `.env` con una de estas opciones:

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
   - El usuario puede revisar el historial, exportar la sesión en PDF o reiniciar con nueva configuración

## Estructura del proyecto

```
Entrevista_Tecnica-IA/
├── server.js           # Servidor Express
├── routes/
│   └── interview.js     # Rutas de la API
├── services/
│   └── aiService.js    # Integración IA (Groq, OpenAI, Gemini, Ollama)
├── storage/
│   └── historyStore.js # Almacenamiento en memoria
├── public/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── img/
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
- **Exportar PDF:** Descarga del informe detallado con resultados, preguntas, respuestas y sugerencias
- **Diseño:** Responsivo, animaciones suaves, tema oscuro

---

## Créditos

**Desarrollador:** [Julio Pintos](https://github.com/japintos)

**Powered by:**
- [WebXpert](https://www.webxpert.com.ar)
- [Groq](https://groq.com) (IA)
