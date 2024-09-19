import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { useAuth } from "app/services/api/supabase/auth/useAuth"

interface SelectNickNameScreenProps extends AppStackScreenProps<"SelectNickName"> {}

export const SelectNickNameScreen: FC<SelectNickNameScreenProps> = observer(
  function SelectNickNameScreen() {
    const [name, setName] = useState<string>("")
    const { updateNickname, user } = useAuth()
    return (
      <Screen style={$root} preset="fixed">
        <Text text="Choose a nickname..." size="xl" />
        <TextField value={name} onChangeText={(value) => setName(value)} />
        <Button
          text="Create"
          onPress={async () => {
            if (user) {
              const result = await updateNickname(user.id, name)
              if (result.error) {
                console.log(result.error)
              }
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
  alignItems: "center",
}
