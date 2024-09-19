import { PostgrestError } from "@supabase/supabase-js"
import { FriendList, FriendRequest, QuizDB } from "../../api.types"
import { supabase } from "../supabase"
import {
  DBApi,
  DBDeleteUpdateResponse,
  DBFriendListResponse,
  DBFriendRequestResponse,
  DBInsertResponse,
  DBNicknameResponse,
  DBStadisticsResponse,
} from "./dbApi"

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
        user_id: userId,
        nickname,
      })
      .select()

    if (error) {
      return { success: false, error: { name: error.code, message: error.message } }
    } else {
      return { success: true, insertId: data[0].id }
    }
  }

  // Get user friend list.
  // @params userId
  // @return List of friends.
  async getFriendList(userId: string): Promise<DBFriendListResponse> {
    try {
      const { data, error } = await supabase
        .from("Friends")
        .select("friend_id, profile:UserProfile!friend_id(nickname)")
        .eq("user_id", userId)

      if (error) {
        throw error
      } else {
        return { success: true, friendList: data as unknown as FriendList }
      }
    } catch (error) {
      const err: PostgrestError = error as PostgrestError
      return { success: false, error: { name: err.code, message: err.message } }
    }
  }

  // Get pendent friend request.
  // @params userId
  // @return array of requests.
  async getFriendRequest(userId: string): Promise<DBFriendRequestResponse> {
    try {
      const { data, error } = await supabase
        .from("FriendRequest")
        .select("id, sender_id, profile:UserProfile!sender_id(nickname)")
        .eq("user_id", userId)

      if (error) {
        throw error
      } else {
        return { success: true, friendRequest: data as unknown as FriendRequest[] }
      }
    } catch (error) {
      const err: PostgrestError = error as PostgrestError
      return { success: false, error: { name: err.code, message: err.message } }
    }
  }

  // Creates friend request.
  // @params userId
  // @params friendNickname
  // @return  insertId/success/error.
  async sendFriendRequest(userId: string, friendName: string): Promise<DBInsertResponse> {
    try {
      const { data, error } = await supabase
        .from("UserProfiles")
        .select("user_id")
        .eq("nickname", friendName)
        .single()

      const userData = data

      if (error) {
        throw error
      } else {
        // COMPROBAR SI YA ES AMIGO O SI REQUEST YA ENVIADA. (RPC FUNCTION)
        const { data, error } = await supabase
          .from("FriendRequest")
          .insert({
            sender_id: userId,
            receiver_id: userData?.user_id,
          })
          .select()

        if (error) {
          throw error
        }

        return { success: true, insertId: data[0].id }
      }
    } catch (error) {
      const err: PostgrestError = error as PostgrestError
      return { success: false, error: { name: err.code, message: err.message } }
    }
  }

  // Deletes friend request and creates new friendship.
  // @params userId
  // @params friendId
  // @return  insertId/success/error.
  async acceptFriendRequest(userId: string, friendId: string): Promise<DBInsertResponse> {
    try {
      const { error } = await supabase
        .from("FriendRequest")
        .delete()
        .or(
          `(sender_id.eq.${userId},receiver_id.eq.${friendId}), (receiver_id.eq.${friendId},sender_id.eq.${userId})`,
        )
      if (error) {
        throw error
      } else {
        const { data, error } = await supabase
          .from("Friends")
          .insert([
            { user_id: userId, friend_id: friendId },
            { user_id: userId, friend_id: friendId },
          ])
          .select()
          .single()

        if (error) {
          throw error
        }

        return { success: true, insertId: data.id }
      }
    } catch (error) {
      const err: PostgrestError = error as PostgrestError
      return { success: false, error: { name: err.code, message: err.message } }
    }
  }

  // Deletes friend request.
  // @params requestId
  // @return  success/error.
  async cancelFriendRequest(requestId: string): Promise<DBDeleteUpdateResponse> {
    try {
      const { error } = await supabase.from("FriendRequest").delete().eq("id", requestId)

      if (error) {
        throw error
      } else {
        return { success: true }
      }
    } catch (error) {
      const err: PostgrestError = error as PostgrestError
      return { success: false, error: { name: err.code, message: err.message } }
    }
  }

  // Deletes friendship.
  // @params userId
  // @params friendId
  // @return  success/error.
  async deleteFriend(userId: string, friendId: string): Promise<DBDeleteUpdateResponse> {
    try {
      const { error } = await supabase
        .from("Friends")
        .delete()
        .or(
          `(user_id.eq.${userId},friend_id.eq.${friendId}), (user_id.eq.${friendId},friend_id.eq.${userId})`,
        )

      if (error) {
        throw error
      } else {
        return { success: true }
      }
    } catch (error) {
      const err: PostgrestError = error as PostgrestError
      return { success: false, error: { name: err.code, message: err.message } }
    }
  }
}

// Singleton instance of the API for convenience
export const dbApi = new SupabaseDBApi()
