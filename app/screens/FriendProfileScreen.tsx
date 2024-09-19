import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, UserProfile } from "app/components"
import { FriendsStackScreenProps } from "app/navigators"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface FriendProfileScreenProps extends FriendsStackScreenProps<"FriendProfile"> {}

export const FriendProfileScreen: FC<FriendProfileScreenProps> = observer(
  function FriendProfileScreen(_props: FriendProfileScreenProps) {
    return (
      <Screen style={$root} preset="fixed">
        <UserProfile uid={_props.route.params.uid} />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
