import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { quizApi } from "app/services/api"
// import { useStores } from "app/models"

interface QuizGeneratorScreenProps extends AppStackScreenProps<"QuizGenerator"> {}

export const QuizGeneratorScreen: FC<QuizGeneratorScreenProps> = observer(
  function QuizGeneratorScreen(_props) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const { navigation } = _props

    const [topic, setTopic] = useState<string>("")

    return (
      <Screen style={$root} preset="fixed">
        <Text text="Choose topic..." size="xl" />
        <TextField value={topic} onChangeText={(value) => setTopic(value)} />
        <Button
          text="Generate"
          onPress={async () => {
            const result = await quizApi.getQuiz({ topic })

            if (result.success) {
              navigation.navigate("Quiz", { questions: result.data })
            } else {
              console.log(result.error)
            }
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
