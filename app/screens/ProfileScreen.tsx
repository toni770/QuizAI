import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { TabScreenProps } from "app/navigators"
import { Screen, UserProfile } from "app/components"

interface ProfileScreenProps extends TabScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  return (
    <Screen style={$root} preset="fixed">
      <UserProfile />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
