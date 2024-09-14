import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { TabScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { useAuth } from "app/services/api/supabase/auth/useAuth"
import { dbApi } from "app/services/api/supabase/db/supabaseDBApi"
import { UserStadistic } from "app/services/api/supabase/db/dbApi"
import { Categories } from "app/services/api/api.types"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ProfileScreenProps extends TabScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  const [data, setData] = useState<UserStadistic | undefined>(undefined)
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      console.log(user)
      if (user) {
        const result = await dbApi.getUserStadistics(user.id)

        if (result.data) {
          console.log(result.data)
          setData(result.data)
        } else if (result.error) {
          console.log(result.error)
        }
      }
      // setData([{ Quiz: { category_id: 4, numQuestions: 3, topic: "Gatos" }, score: 20 }])
    }

    fetchData()
  }, [])

  return (
    <Screen style={$root} preset="fixed">
      {data ? (
        <>
          <Text text={"Total"} preset="subheading" />
          <Text text={data.totalQuiz.toString()} preset="heading" />
          {Object.entries(Categories).map(([key, value], index) => {
            return (
              <View key={key}>
                <Text tx={value} preset="subheading" />
                <Text text={data.categoryTotalQuiz[index].toString()} preset="heading" />
              </View>
            )
          })}
        </>
      ) : (
        <Text text={"No data found"} />
      )}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
