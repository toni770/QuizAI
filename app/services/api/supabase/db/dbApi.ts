import { QuizDB } from "../../api.types"

export type DBResponse = {
  success: boolean
  error?: Error
}

export interface DBApi {
  addQuiz: (quiz: QuizDB) => Promise<DBResponse>
}
