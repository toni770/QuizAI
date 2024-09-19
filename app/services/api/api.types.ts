import { TxKeyPath } from "app/i18n"

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

/// QUIZ
export interface QuizParams {
  topic: string
  language: string
  numQuestions: number
}

export interface QuizQuestion {
  Q: string
  A: Array<string>
}

export interface Quiz {
  id: number
  T: string
  C: number
  R: QuizQuestion[]
}

export interface QuizDB {
  quiz: Quiz
  config: { nQuestions: number; language: string }
}

export const Categories: Record<number, TxKeyPath> = {
  1: "categories.category1",
  2: "categories.category2",
  3: "categories.category3",
  4: "categories.category4",
  5: "categories.category5",
  6: "categories.category6",
  7: "categories.category7",
}

export type FriendList = { friend_id: string; profile: { nickname: string } }[]

export type FriendRequest = {
  id: string
  sender_id: string
  profile: { nickname: string }
}

export interface APIResponse {
  data?: any
  error?: any
  success: boolean
}

export interface OpenAIResponse {
  id: string
  object: string
  created: number
  model: string
  system_fingerprint: string
  choices: {
    index: number
    message: {
      role: string
      content: string
    }
    logprobs: null
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number

  headers: any
}
