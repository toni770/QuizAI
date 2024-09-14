import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { TabScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"

interface FriendListScreenProps extends TabScreenProps<"FriendList"> {}

export const FriendListScreen: FC<FriendListScreenProps> = observer(function FriendListScreen() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="friendList" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
