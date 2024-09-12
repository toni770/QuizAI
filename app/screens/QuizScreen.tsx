import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Icon, Screen, Text } from "app/components"
import { shuffleArray } from "app/utils/shuffleArray"
import { Categories } from "app/services/api/api.types"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { translate } from "../i18n/translate"
import { dbApi } from "app/services/api/supabase/db/supabaseDBApi"
import { useAuth } from "app/services/api/supabase/auth/useAuth"

interface QuizScreenProps extends AppStackScreenProps<"Quiz"> {}

export const QuizScreen: FC<QuizScreenProps> = observer(function QuizScreen(_props) {
  const { quiz } = _props.route.params

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined)
  const [shuffledAnswers, setShuffledAnswers] = useState<Array<string>>([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (quiz && quiz.R.length > 0) {
      const answers = shuffleArray([...quiz.R[currentQuestionIndex].A])
      setShuffledAnswers(answers)
    }
  }, [quiz, currentQuestionIndex])

  const { user } = useAuth()

  const answerQuestion = function (answer: string) {
    if (answer === quiz.R[currentQuestionIndex].A[0]) {
      setScore(score + 10)
    }
    setSelectedAnswer(answer)
  }

  const nextQuestion = async function () {
    if (currentQuestionIndex < quiz.R.length - 1) {
      setSelectedAnswer(undefined)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      if (user) {
        await dbApi.completeQuiz(quiz.id, user?.id, score)
      }

      _props.navigation.navigate("QuizResults", { score })
    }
  }

  return (
    <Screen style={$root}>
      <View>
        <Text text={quiz.T} size="xxl" />
        <Text text={translate(Categories[quiz.C])} size="xl" />
      </View>

      <Text text={quiz.R[currentQuestionIndex].Q} size="xl" />
      {shuffledAnswers.map((value, index) => {
        return (
          <Button
            style={[
              $buttons,
              selectedAnswer !== undefined &&
                (value === quiz.R[currentQuestionIndex].A[0]
                  ? $correctButton
                  : value === selectedAnswer && $wrongButton),
            ]}
            key={index}
            text={value}
            onPress={() => answerQuestion(value)}
            disabled={selectedAnswer !== undefined}
          />
        )
      })}

      {selectedAnswer && <Icon icon={"caretRight"} size={50} onPress={nextQuestion} />}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "space-around",
}

const $buttons: ViewStyle = {
  marginVertical: 5,
}

const $correctButton: ViewStyle = {
  backgroundColor: "green",
}

const $wrongButton: ViewStyle = {
  backgroundColor: "red",
}
