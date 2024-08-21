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
}

export interface QuizQuestion {
  Q: string
  A: Array<string>
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
