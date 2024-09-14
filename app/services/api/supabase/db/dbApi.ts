import { QuizDB } from "../../api.types"

export type DBInsertResponse = {
  success: boolean
  insertId?: number
  error?: Error
}

export type DBStadisticsResponse = {
  success: boolean
  data?: UserStadistic
  error?: Error
}

export type DBNicknameResponse = {
  success: boolean
  nickname?: string
  error?: Error
}

export type UserStadistic = { totalQuiz: number; categoryTotalQuiz: number[] }

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
  // Get user stadistics from DB.
  // @params user Id
  // @returns user completed quizes by categories.
  getUserStadistics: (userId: string) => Promise<DBStadisticsResponse>
  // Get user nickname.
  // @params user Id
  // result Gets nickname
  getUserNickname: (userId: string) => Promise<DBNicknameResponse>
  // Set user nickname.
  // @params user Id.
  // @params nickname.
  // @return insertId/success/error.
  setUserNickname: (userId: string, nickname: string) => Promise<DBInsertResponse>
}
