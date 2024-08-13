import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
// import { useStores } from "app/models"

interface QuizGeneratorScreenProps extends AppStackScreenProps<"QuizGenerator"> {}

export const QuizGeneratorScreen: FC<QuizGeneratorScreenProps> = observer(
  function QuizGeneratorScreen(_props) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const { navigation } = _props

    return (
      <Screen style={$root} preset="fixed">
        <Text text="Choose theme..." size="xl" />
        <TextField />
        <Button
          text="Generate"
          onPress={() => {
            navigation.navigate("Quiz")
          }}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: 20,
}
