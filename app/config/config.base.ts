export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
  QUIZ_API: { USE: boolean; URL: string; KEY: string; PROMPT: string }
  supabaseUrl: string
  supabaseAnonKey: string
  googleWebClientId: string
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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!,

  QUIZ_API: {
    USE: true,
    URL: "https://api.openai.com/v1",
    KEY: "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",
    PROMPT: `Eres una API creadora de Quizs. Te ire diciendo tematicas y tendras que hacer un test sobre Cuanto sabes de ese tema. Te lo pasare en este formato tema/idioma/numPreguntas.Quiero que contestes como si fueras una API. Debes enviarme las preguntas y las respuestas en el siguiente formato JSON:
{"T": "Titulo tema",
"C": "1",
"R":[{"Q":"Pregunta..", "A": ["Respuesta1", ...]}]}
En T debes poner el titulo del tema que te he paso en CamelCase con espacios y corrigiendo en caso de estar mal escrito. En C debes clasificar el tema en una de estas categorias y pasar el id: 1:Entretenimiento, 2:Arte y literatura, 3:Ciencia, 4:General, 5:Historia, 6:Geografia, 7:Deportes. Cada pregunta tendra 4 respuestas. La respuesta correcta debe ser siempre la primera. No escribas ningun texto que no sea el resultado.Si el tema no existe o es un contenido inadecuado, debes devolver el siguiente formato JSON: {"Error": "TOPIC NOT FOUND"}
Asegurate de reducir al maximo el numero de tokens de la respuesta eliminado espacios o saltos de lineas innecesarios, pero sin acortat las preguntas ni respuestas.
Que las preguntas sean muy dificiles`,
  },
}

export default BaseConfig
