import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { TabScreenProps } from "app/navigators"
import { Button, Screen } from "app/components"
import { useAuth } from "app/services/api/supabase/auth/useAuth"

interface SettingsScreenProps extends TabScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen() {
  const { signOut } = useAuth()

  return (
    <Screen style={$root} preset="fixed">
      <Button onPress={signOut}>Sign Out</Button>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
