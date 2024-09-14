import { PostgrestError } from "@supabase/supabase-js"
import { QuizDB } from "../../api.types"
import { supabase } from "../supabase"
import { DBApi, DBInsertResponse, DBNicknameResponse, DBStadisticsResponse } from "./dbApi"

export class SupabaseDBApi implements DBApi {
  // Insert Quiz to DB.
  // @params quiz Quiz data to insert.
  // @return insertId/success/error.
  async addQuiz(quizDB: QuizDB): Promise<DBInsertResponse> {
    const { data, error } = await supabase
      .from("Quiz")
      .insert({
        topic: quizDB.quiz.T,
        questions: quizDB.quiz.R,
        category_id: quizDB.quiz.C,
        numQuestions: quizDB.config.nQuestions,
        language: quizDB.config.language,
      })
      .select()

    if (error) {
      return { success: false, error: { name: error.code, message: error.message } }
    } else {
      return { success: true, insertId: data[0].id }
    }
  }

  // Insert completed quiz from user to DB.
  // @params quizId completed quiz Id.
  // @params userId user's Id.
  // @params score quiz score.
  // @return insertId/success/error.
  async completeQuiz(quizId: number, userId: string, score: number): Promise<DBInsertResponse> {
    const { data, error } = await supabase
      .from("QuizUser")
      .insert({
        quiz_id: quizId,
        user_id: userId,
        score,
      })
      .select()

    if (error) {
      return { success: false, error: { name: error.code, message: error.message } }
    } else {
      return { success: true, insertId: data[0].id }
    }
  }

  // Get user stadistics from DB.
  // @params user Id
  // @returns user completed quizes by categories.
  async getUserStadistics(userId: string): Promise<DBStadisticsResponse> {
    try {
      const { data, error } = await supabase.rpc("get_user_stats", { userid: userId })

      if (error) {
        throw error
      } else {
        return { success: true, data }
      }
    } catch (error) {
      const err: PostgrestError = error as PostgrestError
      return { success: false, error: { name: err.code, message: err.message } }
    }
  }

  // Get user nickname.
  // @params user Id
  // result Gets nickname
  async getUserNickname(userId: string): Promise<DBNicknameResponse> {
    try {
      const { data, error } = await supabase
        .from("UserProfile")
        .select("nickname")
        .eq("user_id", userId)

      if (error) {
        throw error
      } else {
        return { success: true, nickname: data[0].nickname }
      }
    } catch (error) {
      const err: PostgrestError = error as PostgrestError
      return { success: false, error: { name: err.code, message: err.message } }
    }
  }

  // Set user nickname.
  // @params user Id.
  // @params nickname.
  // @return insertId/success/error.
  async setUserNickname(userId: string, nickname: string): Promise<DBInsertResponse> {
    const { data, error } = await supabase
      .from("UserProfile")
      .insert({
        userId,
        nickname,
      })
      .select()

    if (error) {
      return { success: false, error: { name: error.code, message: error.message } }
    } else {
      return { success: true, insertId: data[0].id }
    }
  }
}

// Singleton instance of the API for convenience
export const dbApi = new SupabaseDBApi()
