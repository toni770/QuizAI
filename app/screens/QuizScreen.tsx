import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Icon, Screen, Text } from "app/components"
import { shuffleArray } from "app/utils/shuffleArray"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface QuizScreenProps extends AppStackScreenProps<"Quiz"> {}

export const QuizScreen: FC<QuizScreenProps> = observer(function QuizScreen(_props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined)
  const [shuffledAnswers, setShuffledAnswers] = useState<Array<string>>([])
  const [score, setScore] = useState(0)

  const questions = _props.route.params.questions

  useEffect(() => {
    const answers = shuffleArray([...questions[currentQuestionIndex].A])
    setShuffledAnswers(answers)
  }, [currentQuestionIndex])

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const answerQuestion = function (answer: string) {
    if (answer === questions[currentQuestionIndex].A[0]) {
      setScore(score + 1)
    }
    setSelectedAnswer(answer)
  }

  return (
    <Screen style={$root} preset="fixed">
      <Text text={questions[currentQuestionIndex].Q} size="xl" />
      {shuffledAnswers.map((value, index) => {
        return (
          <Button
            style={[
              $buttons,
              selectedAnswer !== undefined &&
                (value === questions[currentQuestionIndex].A[0]
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

      {selectedAnswer && (
        <Icon
          icon={"caretRight"}
          size={50}
          onPress={() => {
            if (currentQuestionIndex < questions.length - 1) {
              setSelectedAnswer(undefined)
              setCurrentQuestionIndex(currentQuestionIndex + 1)
            } else {
              _props.navigation.navigate("QuizGenerator")
            }
          }}
        />
      )}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
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
