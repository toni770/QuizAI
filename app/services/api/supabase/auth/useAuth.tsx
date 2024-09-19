import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { Session, supabase } from "../supabase"
import { AuthResponse, AuthTokenResponsePassword, User } from "@supabase/supabase-js"
import GoogleSignin from "./googleSignIn"
import { dbApi } from "../db/supabaseDBApi"
import { DBInsertResponse } from "../db/dbApi"

type AuthState = {
  isAuthenticated: boolean
  hasNickname: boolean
  nickname?: string
  token?: Session["access_token"]
  user?: Session["user"]
}

type SignInProps = {
  email: string
  password: string
}

type SignUpProps = {
  email: string
  password: string
}

type GoogleAuthResponse = {
  data:
    | {
        user: User
        session: Session
      }
    | {
        user: null
        session: null
      }
}

type AuthContextType = {
  signIn: (props: SignInProps) => Promise<AuthTokenResponsePassword>
  signUp: (props: SignUpProps) => Promise<AuthResponse>
  signInWithGoogle: () => Promise<GoogleAuthResponse>
  signOut: () => void
  updateNickname: (userId: string, nickname: string) => Promise<DBInsertResponse>
} & AuthState

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  hasNickname: false,
  token: undefined,
  nickname: undefined,
  signIn: () => new Promise(() => ({})),
  signInWithGoogle: () => new Promise(() => ({})),
  signUp: () => new Promise(() => ({})),
  signOut: () => undefined,
  updateNickname: () => new Promise(() => ({})),
})

export function useAuth() {
  const value = useContext(AuthContext)

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
  }

  return value
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<AuthState["token"]>(undefined)
  const [user, setUser] = useState<AuthState["user"]>(undefined)
  const [nickname, setNickname] = useState<AuthState["nickname"]>(undefined)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_OUT":
          setToken(undefined)
          setUser(undefined)
          setNickname(undefined)
          break
        case "INITIAL_SESSION":
        case "SIGNED_IN":
        case "TOKEN_REFRESHED":
          setToken(session?.access_token)
          setUser(session?.user)
          if (session) getNickname(session.user.id)
          break
        default:
        // no-op
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signIn = useCallback(
    async ({ email, password }: SignInProps) => {
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (result.data?.session?.access_token) {
        setToken(result.data.session.access_token)
        setUser(result.data.user)
      }

      return result
    },
    [supabase],
  )

  const signUp = useCallback(
    async ({ email, password }: SignUpProps) => {
      const result = await supabase.auth.signUp({
        email,
        password,
      })

      if (result.data?.session?.access_token && result.data?.user) {
        setToken(result.data.session.access_token)
        setUser(result.data.user)
        getNickname(result.data.user.id)
      }

      return result
    },
    [supabase],
  )

  const signInWithGoogle = useCallback(async () => {
    await GoogleSignin.hasPlayServices()
    try {
      const userInfo = await GoogleSignin.signIn()
      if (userInfo.data?.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        })
        console.log(error, data)
        if (data?.session?.access_token) {
          setToken(data.session.access_token)
          setUser(data.user)
          getNickname(data.user.id)
        }
        return { data }
      } else {
        return { data: { user: null, session: null } }
      }
    } catch (error) {
      console.log(error)
      return { data: { user: null, session: null } }
    }
  }, [supabase])

  const signOut = useCallback(async () => {
    GoogleSignin.signOut()
    await supabase.auth.signOut()
    setToken(undefined)
    setUser(undefined)
    setNickname(undefined)
  }, [supabase])

  const updateNickname = useCallback(
    async (userId: string, nickname: string): Promise<DBInsertResponse> => {
      const result = await dbApi.setUserNickname(userId, nickname)
      if (!result.error) {
        setNickname(nickname)
      }
      return result
    },
    [supabase],
  )

  const getNickname = useCallback(
    async (userId: string) => {
      const result = await dbApi.getUserNickname(userId)
      console.log(result)
      if (result.success && result.nickname) {
        setNickname(result.nickname)
      }
    },
    [supabase],
  )

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        hasNickname: !!nickname,
        nickname,
        token,
        user,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        updateNickname,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
