import React, { createContext, PropsWithChildren, useCallback, useContext } from "react"
import { supabase } from "../supabase"

type QuizProps = {
  topic: string
  questions: any
  categoryId: number
}

type DBResponse = {
  success: boolean
  error?: Error
}

type DBContextType = {
  addQuiz: (props: QuizProps) => Promise<DBResponse>
}

const DBContext = createContext<DBContextType>({
  addQuiz: () => new Promise(() => ({})),
})

export function useDB() {
  const value = useContext(DBContext)

  if (!value) {
    throw new Error("useDB must be used within an DBProvider")
  }

  return value
}

export const DBProvider = ({ children }: PropsWithChildren) => {
  const addQuiz = useCallback(async ({ topic, questions, categoryId }: QuizProps) => {
    const { error } = await supabase.from("Quiz").insert({ topic, questions, categoryId })

    if (error) {
      return { success: false, error: { name: error.code, message: error.message } }
    } else {
      return { success: true }
    }
  }, [])

  return (
    <DBContext.Provider
      value={{
        addQuiz,
      }}
    >
      {children}
    </DBContext.Provider>
  )
}
