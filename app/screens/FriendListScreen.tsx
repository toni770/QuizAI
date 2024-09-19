import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, View, ViewStyle } from "react-native"
import { FriendsStackScreenProps } from "app/navigators"
import { Icon, ListView, Screen, Text } from "app/components"
import { dbApi } from "app/services/api/supabase/db/supabaseDBApi"
import { useAuth } from "app/services/api/supabase/auth/useAuth"
import { TouchableOpacity } from "react-native-gesture-handler"
import { FriendList } from "app/services/api"

interface FriendListScreenProps extends FriendsStackScreenProps<"FriendList"> {}

export const FriendListScreen: FC<FriendListScreenProps> = observer(function FriendListScreen(
  _props: FriendListScreenProps,
) {
  const { user } = useAuth()
  const [data, setData] = useState<FriendList | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      console.log(user)
      if (user) {
        const result = await dbApi.getFriendList(user?.id)

        if (result.friendList) {
          setData(result.friendList)
        } else if (result.error) {
          console.log(result.error)
        }
      }
    }

    fetchData()
  }, [])

  return (
    <Screen style={$root} preset="fixed">
      <View style={$listViewContainer}>
        <Icon icon={"menu"} size={30} />
        <Text preset="subheading" text="Friends" />
        {data ? (
          <ListView
            data={data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    _props.navigation.navigate("FriendProfile", {
                      uid: item.friend_id,
                    })
                  }
                >
                  <View style={$friendItem}>
                    <Text>{item.profile.nickname}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
            estimatedItemSize={200}
          />
        ) : (
          <Text text="No data found" />
        )}

        <Text preset="subheading" text="Requests" />
        {data ? (
          <ListView
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={$requestItem}>
                  <Text>{item.profile.nickname}</Text>
                  <Icon icon={"check"} />
                  <Icon icon={"x"} />
                </View>
              )
            }}
            estimatedItemSize={200}
          />
        ) : (
          <Text text="No data found" />
        )}
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $listViewContainer: ViewStyle = {
  flex: 1,
  width: Dimensions.get("screen").width,
  marginTop: 20,
}

const $friendItem: ViewStyle = {
  borderWidth: 2,
  padding: 10,
  paddingHorizontal: 150,
}

const $requestItem: ViewStyle = {
  borderWidth: 2,
  padding: 10,
  paddingHorizontal: 150,
  flexDirection: "row",
  justifyContent: "space-between",
}
