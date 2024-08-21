import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Share, TextStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface QuizResultsScreenProps extends AppStackScreenProps<"QuizResults"> {}

export const QuizResultsScreen: FC<QuizResultsScreenProps> = observer(function QuizResultsScreen(
  _props,
) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const nav = _props.navigation
  const { score } = _props.route.params
  return (
    <Screen style={$root}>
      <Button
        text="X"
        preset="reversed"
        style={$exitButton}
        textStyle={$centeredText}
        onPress={() => {
          nav.navigate("QuizGenerator")
        }}
      />
      <Text text="Result" preset="heading" />
      <Text text="Your score" preset="subheading" />
      <Text text={score.toString()} size="xxl" style={$centeredText} />
      <Button
        text="Share"
        onPress={() =>
          Share.share({ message: `He conseguido una puntuacion de ${score} en un Quiz en AIQuiz!` })
        }
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $centeredText: TextStyle = {
  textAlign: "center",
}

const $exitButton: ViewStyle = {
  width: "10%",
}
