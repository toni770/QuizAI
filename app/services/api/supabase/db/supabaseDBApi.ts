import { QuizDB } from "../../api.types"
import { supabase } from "../supabase"
import { DBApi, DBResponse } from "./dbApi"

export class SupabaseDBApi implements DBApi {
  async addQuiz(quizDB: QuizDB): Promise<DBResponse> {
    const { error } = await supabase.from("Quiz").insert({
      topic: quizDB.quiz.T,
      questions: quizDB.quiz.R,
      category_id: quizDB.quiz.C,
      numQuestions: quizDB.config.nQuestions,
      language: quizDB.config.language,
    })

    if (error) {
      return { success: false, error: { name: error.code, message: error.message } }
    } else {
      return { success: true }
    }
  }
}

// Singleton instance of the API for convenience
export const dbApi = new SupabaseDBApi()
