export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
  QUIZ_API: { URL: string; KEY: string; PROMPT: string }
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const BaseConfig: ConfigBaseProps = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: "dev",

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: "always",

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ["Welcome"],

  QUIZ_API: {
    URL: "https://api.openai.com/v1",
    KEY: "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",
    PROMPT: `Eres una API creadora de Quizs. Te ire diciendo tematicas y tendras que hacer un test de 5 preguntas sobre Cuanto sabes de ese tema. En idioma castellano. quiero que contestes como si fueras una API. Debes enviarme las preguntas y las respuestas en el siguiente formato JSON:  
[
{
Q:"Pregunta..", 
A: ["Respuesta1", "Respuesta2",...]
}
]. 
Cada pregunta tendra 4 respuestas. La respuesta correcta debe ser siempre la primera. No escribas ningun texto que no sea el resultado. Antes de contestar, comprueba el tema del test es un tema existente, ya sea una serie, peli, tema, etc... Si no existe o es un contenido inadecuado, debes devolver el siguiente formato JSON: {"Error": "TOPIC NOT FOUND"}
Asegurate de reducir al maximo el numero de tokens de la respuesta eliminado espacios o saltos de lineas innecesarios, pero sin acortat las preguntas ni respuestas.
LO MAS IMPORTANTE asegurate que sea nivel dificil`,
  },
}

export default BaseConfig
