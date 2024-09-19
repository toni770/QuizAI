import * as React from "react"
import { StyleProp, View, ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { dbApi } from "app/services/api/supabase/db/supabaseDBApi"
import { useAuth } from "app/services/api/supabase/auth/useAuth"
import { useEffect, useState } from "react"
import { UserStadistic } from "app/services/api/supabase/db/dbApi"
import { Categories } from "app/services/api/api.types"

export interface UserProfileProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  uid?: string
}

/**
 * Describe your component here
 */
export const UserProfile = observer(function UserProfile(_props: UserProfileProps) {
  const [data, setData] = useState<UserStadistic | undefined>(undefined)
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userId = _props.uid ? _props.uid : user.id
        const result = await dbApi.getUserStadistics(userId)

        if (result.data) {
          console.log(result.data)
          setData(result.data)
        } else if (result.error) {
          console.log(result.error)
        }
      }
    }

    fetchData()
  }, [])

  return (
    <View style={$root}>
      {data ? (
        <>
          <View style={$identity}>
            {user?.user_metadata.avatar_url && (
              <Image
                style={$image}
                source={{
                  uri: user?.user_metadata.avatar_url,
                }}
              />
            )}

            <Text text={data.name} preset="heading" />
          </View>

          <Text text={"Total"} preset="subheading" />
          <Text text={data.totalQuiz.toString()} preset="heading" />
          {Object.entries(Categories).map(([key, value], index) => {
            return (
              <View key={key} style={$listData}>
                <Text tx={value} preset="subheading" />
                <Text text={data.categoryTotalQuiz[index].toString()} preset="heading" />
              </View>
            )
          })}
        </>
      ) : (
        <Text text={"No data found"} />
      )}
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $listData: ViewStyle = {
  alignItems: "center",
}

const $image: ImageStyle = {
  width: 50,
  height: 50,
  marginRight: 10,
}

const $identity: ViewStyle = {
  flexDirection: "row",
  padding: 10,
  borderBottomWidth: 1,
  width: "100%",
}
