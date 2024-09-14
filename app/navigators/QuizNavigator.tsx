import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import * as Screens from "app/screens"
import { Quiz } from "app/services/api"

export type QuizNavigatorParamList = {
  QuizGenerator: undefined
  Quiz: { quiz: Quiz }
  QuizResults: { score: number }
}

export type QuizStackScreenProps<T extends keyof QuizNavigatorParamList> = NativeStackScreenProps<
  QuizNavigatorParamList,
  T
>

const Stack = createNativeStackNavigator<QuizNavigatorParamList>()
export const QuizNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuizGenerator" component={Screens.QuizGeneratorScreen} />
      <Stack.Screen name="Quiz" component={Screens.QuizScreen} />
      <Stack.Screen name="QuizResults" component={Screens.QuizResultsScreen} />
    </Stack.Navigator>
  )
}
