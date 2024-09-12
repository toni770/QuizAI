import { QuizDB } from "../../api.types"

export type DBInsertResponse = {
  success: boolean
  insertId?: number
  error?: Error
}

export interface DBApi {
  // Insert Quiz to DB.
  // @params quiz Quiz data to insert.
  // @return insertId/success/error.
  addQuiz: (quiz: QuizDB) => Promise<DBInsertResponse>
  // Insert completed quiz from user to DB.
  // @params quizId completed quiz Id.
  // @params userId user's Id.
  // @params score quiz score.
  // @return insertId/success/error.
  completeQuiz: (quizId: number, userId: string, score: number) => Promise<DBInsertResponse>
}
