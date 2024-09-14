import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Share, TextStyle, View, ViewStyle } from "react-native"
import { QuizStackScreenProps } from "app/navigators"
import { Button, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface QuizResultsScreenProps extends QuizStackScreenProps<"QuizResults"> {}

export const QuizResultsScreen: FC<QuizResultsScreenProps> = observer(function QuizResultsScreen(
  _props,
) {
  const nav = _props.navigation
  const { score } = _props.route.params

  return (
    <View style={$root}>
      <View style={$buttonContainer}>
        <Button
          text="X"
          preset="reversed"
          style={$exitButton}
          textStyle={$centeredText}
          onPress={() => {
            nav.navigate("QuizGenerator")
          }}
        />
      </View>

      <View>
        <Text text="Result" preset="heading" />
        <Text text="Your score" preset="subheading" />
        <Text text={score.toString()} size="xxl" style={$centeredText} />
      </View>
      <Button
        text="Share"
        onPress={() =>
          Share.share({ message: `He conseguido una puntuacion de ${score} en un Quiz en AIQuiz!` })
        }
      />
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "space-around",
  alignItems: "center",
}

const $centeredText: TextStyle = {
  textAlign: "center",
}

const $exitButton: ViewStyle = {
  width: 50,
}
const $buttonContainer: ViewStyle = {
  width: "100%",
  alignItems: "flex-end",
  paddingRight: 20,
}
