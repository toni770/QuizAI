import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import * as Screens from "app/screens"

export type FriendsNavigatorParamList = {
  FriendList: undefined
  FriendProfile: { uid: string }
}

export type FriendsStackScreenProps<T extends keyof FriendsNavigatorParamList> =
  NativeStackScreenProps<FriendsNavigatorParamList, T>

const Stack = createNativeStackNavigator<FriendsNavigatorParamList>()
export const FriendsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FriendList" component={Screens.FriendListScreen} />
      <Stack.Screen name="FriendProfile" component={Screens.FriendProfileScreen} />
    </Stack.Navigator>
  )
}
