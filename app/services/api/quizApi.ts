import Config from "app/config"
import { ApiConfig, APIResponse, OpenAIResponse, QuizParams } from "./api.types"
import { Api } from "./api"

export const DEFAULT_QUIZ_API_CONFIG: ApiConfig = {
  url: Config.QUIZ_API.URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${Config.QUIZ_API.KEY}`,
  },
}

const quiz = {
  T: "Futurama",
  C: 1,
  R: [
    {
      Q: "¿Cuál es el número de serie completo de Bender?",
      A: ["2716057", "00100100", "3370318", "2716055"],
    },
    {
      Q: "¿Cómo se llama el clon del profesor Farnsworth?",
      A: ["Cubert", "Hubert", "Dwight", "Qubert"],
    },
    {
      Q: "¿Qué ingrediente secreto contiene la bebida Slurm?",
      A: [
        "Excremento de un gusano",
        "Veneno alienígena",
        "Sangre de Nibloniano",
        "Extracto de Omicron Persei 8",
      ],
    },
    {
      Q: "¿Cuál es el nombre del planeta natal de Kif Kroker?",
      A: ["Amphibios 9", "Decapod 10", "Omicron Persei 8", "Chapek 9"],
    },
    {
      Q: "¿Cómo se llama el emperador del planeta Trisol?",
      A: ["Emperador Plon", "Emperador Bont", "Emperador Zog", "Emperador Lon"],
    },
    {
      Q: "¿Qué deporte futurista juega Fry en el episodio 'A Leela of Her Own'?",
      A: ["Blernsball", "Holophonor", "Bolos espaciales", "Basketball espacial"],
    },
    {
      Q: "¿Qué criatura marina gigante es adorada como un dios por los Decapodianos?",
      A: [
        "El Ser del Mar",
        "El Cangrejo Enorme",
        "El Gran Calamar",
        "El Monstruo de las Profundidades",
      ],
    },
    {
      Q: "¿Cuál es el eslogan de MomCorp?",
      A: [
        "'Amor maternal en cada producto'",
        "'Nos importa tu bienestar'",
        "'Tu madre te ama'",
        "'Tecnología con corazón'",
      ],
    },
    {
      Q: "¿Cómo se llama la nave espacial de Planet Express?",
      A: ["Planet Express Ship", "Nimbus", "USS Enterprise", "Eagle 5"],
    },
    {
      Q: "¿Cuál es el trabajo de Hermes Conrad en Planet Express?",
      A: ["Burócrata", "Contador", "Ingeniero", "Repartidor"],
    },
  ],
}

export class QuizApi extends Api {
  constructor(config: ApiConfig = DEFAULT_QUIZ_API_CONFIG) {
    super(config)
  }

  async getQuiz(quizParams: QuizParams): Promise<APIResponse> {
    try {
      if (!Config.QUIZ_API.USE) {
        return { data: quiz, success: true }
      }
      const response = await this.apisauce.post("/chat/completions", {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: Config.QUIZ_API.PROMPT,
          },
          {
            role: "user",
            content: `${quizParams.topic}/${quizParams.language}/${quizParams.numQuestions}`,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      })
      if (response.data) {
        const data: OpenAIResponse = response.data as OpenAIResponse

        console.log(data.usage)

        const apiQuestions = JSON.parse(data.choices[0].message.content)

        if (apiQuestions.Error) {
          throw apiQuestions.Error
        }

        return { data: apiQuestions, success: true }
      } else {
        return { data: quiz, success: true }
      }
    } catch (error) {
      return { success: false, error }
    }
  }
}

// Singleton instance of the API for convenience
export const quizApi = new QuizApi()
